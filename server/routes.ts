import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertTourDateSchema, insertTestimonialSchema } from "@shared/schema";
import Mailjet from "node-mailjet";
import session from "express-session";
import mailchimp from "@mailchimp/mailchimp_marketing";

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || "",
  apiSecret: process.env.MAILJET_SECRET_KEY || ""
});

// Mailchimp configuration
const mailchimpApiKey = process.env.MAILCHIMP_API_KEY || "";
const mailchimpServer = mailchimpApiKey.split("-")[1] || "us14";

mailchimp.setConfig({
  apiKey: mailchimpApiKey,
  server: mailchimpServer,
});

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Admin authentication routes
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Failed to logout" });
      } else {
        res.json({ success: true });
      }
    });
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);

      try {
        await mailjet.post("send", { version: "v3.1" }).request({
          Messages: [
            {
              From: {
                Email: process.env.MAILJET_FROM_EMAIL || "noreply@glendamacatangay.com",
                Name: "Glenda Macatangay Website",
              },
              To: [
                {
                  Email: "glenda.macatangay@gmail.com",
                  Name: "Glenda Macatangay",
                },
              ],
              Subject: `New Inquiry: ${contactData.inquiryType} from ${contactData.name}`,
              TextPart: `Name: ${contactData.name}\nEmail: ${contactData.email}\nType: ${contactData.inquiryType}\n\nMessage:\n${contactData.message}`,
              HTMLPart: `
                <h3>New Website Inquiry</h3>
                <p><strong>Name:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Inquiry Type:</strong> ${contactData.inquiryType}</p>
                <p><strong>Message:</strong></p>
                <p>${contactData.message.replace(/\n/g, "<br>")}</p>
              `,
            },
          ],
        });
      } catch (emailError) {
        console.error("Mailjet error:", emailError);
      }

      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  app.get("/api/contacts", requireAdmin, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Newsletter subscription route (Mailchimp)
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email, firstName, lastName, birthday } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const listId = process.env.MAILCHIMP_LIST_ID;

      if (!listId) {
        console.error("MAILCHIMP_LIST_ID is not set");
        return res.status(500).json({ error: "Newsletter configuration error" });
      }

      const mergeFields: Record<string, string> = {};
      if (firstName) mergeFields.FNAME = firstName;
      if (lastName) mergeFields.LNAME = lastName;
      if (birthday) mergeFields.BIRTHDAY = birthday;

      await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: mergeFields,
      });

      res.json({ success: true, message: "Successfully subscribed to newsletter" });
    } catch (error: unknown) {
      console.error("Mailchimp subscription error:", error);

      const mailchimpError = error as { response?: { body?: { title?: string; detail?: string } }; status?: number };
      if (mailchimpError.response?.body?.title === "Member Exists") {
        return res.status(400).json({ error: "This email is already subscribed" });
      }

      if (mailchimpError.status === 400) {
        return res.status(400).json({ error: "Invalid email address" });
      }

      res.status(500).json({ error: "Failed to subscribe. Please try again later." });
    }
  });

  // Tour date routes
  app.get("/api/tour-dates", async (req, res) => {
    try {
      const tourDates = await storage.getTourDates();
      res.json(tourDates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tour dates" });
    }
  });

  app.post("/api/tour-dates", requireAdmin, async (req, res) => {
    try {
      const tourDateData = insertTourDateSchema.parse(req.body);
      const tourDate = await storage.createTourDate(tourDateData);
      res.json(tourDate);
    } catch (error) {
      res.status(400).json({ error: "Invalid tour date data" });
    }
  });

  app.put("/api/tour-dates/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const tourDate = await storage.updateTourDate(id, req.body);
      res.json(tourDate);
    } catch (error) {
      res.status(400).json({ error: "Failed to update tour date" });
    }
  });

  app.delete("/api/tour-dates/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTourDate(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tour date" });
    }
  });

  // Page content routes
  app.get("/api/content/:pageKey", async (req, res) => {
    try {
      const content = await storage.getPageContent(req.params.pageKey);
      res.json(content || { pageKey: req.params.pageKey, content: "" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.get("/api/content", requireAdmin, async (req, res) => {
    try {
      const allContent = await storage.getAllPageContent();
      res.json(allContent);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.put("/api/content/:pageKey", requireAdmin, async (req, res) => {
    try {
      const { content } = req.body;
      const updated = await storage.upsertPageContent(req.params.pageKey, content);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Failed to update content" });
    }
  });

  // Testimonial routes
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/testimonials/placement/:placement", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonialsByPlacement(req.params.placement);
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/testimonials", requireAdmin, async (req, res) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      if (!testimonialData.placement || testimonialData.placement.length === 0) {
        return res.status(400).json({ error: "At least one placement is required" });
      }
      if (!testimonialData.name || !testimonialData.quote) {
        return res.status(400).json({ error: "Name and quote are required" });
      }
      const testimonial = await storage.createTestimonial(testimonialData);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Invalid testimonial data" });
    }
  });

  app.put("/api/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (req.body.placement && req.body.placement.length === 0) {
        return res.status(400).json({ error: "At least one placement is required" });
      }
      const testimonial = await storage.updateTestimonial(id, req.body);
      res.json(testimonial);
    } catch (error) {
      res.status(400).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/testimonials/:id", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTestimonial(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  return httpServer;
}

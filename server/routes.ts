import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertTourDateSchema } from "@shared/schema";
import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || "",
  apiSecret: process.env.MAILJET_SECRET_KEY || ""
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);

      // Send email via Mailjet
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
                  Email: "glenda.macatangay@gmail.com", // Assuming this is the destination
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
        // We still return the contact even if email fails to avoid blocking the UI
      }

      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
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

  app.post("/api/tour-dates", async (req, res) => {
    try {
      const tourDateData = insertTourDateSchema.parse(req.body);
      const tourDate = await storage.createTourDate(tourDateData);
      res.json(tourDate);
    } catch (error) {
      res.status(400).json({ error: "Invalid tour date data" });
    }
  });

  app.delete("/api/tour-dates/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTourDate(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete tour date" });
    }
  });

  return httpServer;
}

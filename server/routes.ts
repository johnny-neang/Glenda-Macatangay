import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertTourDateSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
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

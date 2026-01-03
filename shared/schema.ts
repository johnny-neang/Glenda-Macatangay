import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export const tourDates = pgTable("tour_dates", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  location: text("location").notNull(),
  date: text("date").notNull(),
  description: text("description"),
});

export const insertTourDateSchema = createInsertSchema(tourDates).omit({
  id: true,
});

export type InsertTourDate = z.infer<typeof insertTourDateSchema>;
export type TourDate = typeof tourDates.$inferSelect;

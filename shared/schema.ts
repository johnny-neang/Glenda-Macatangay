import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, serial, integer } from "drizzle-orm/pg-core";
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
  state: text("state"),
  venue: text("venue"),
  date: text("date").notNull(),
  time: text("time"),
  rsvpLink: text("rsvp_link"),
  description: text("description"),
});

export const insertTourDateSchema = createInsertSchema(tourDates).omit({
  id: true,
});

export type InsertTourDate = z.infer<typeof insertTourDateSchema>;
export type TourDate = typeof tourDates.$inferSelect;

export const pageContent = pgTable("page_content", {
  id: serial("id").primaryKey(),
  pageKey: text("page_key").notNull().unique(),
  content: text("content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertPageContentSchema = createInsertSchema(pageContent).omit({
  id: true,
  updatedAt: true,
});

export type InsertPageContent = z.infer<typeof insertPageContentSchema>;
export type PageContent = typeof pageContent.$inferSelect;

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title"),
  quote: text("quote").notNull(),
  placement: text("placement").array().notNull(),
  sortOrder: integer("sort_order").default(0),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

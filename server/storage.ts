import { db } from "./db";
import { contacts, tourDates, pageContent, testimonials, type InsertContact, type Contact, type InsertTourDate, type TourDate, type InsertPageContent, type PageContent, type InsertTestimonial, type Testimonial } from "@shared/schema";
import { desc, eq, arrayContains, asc } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createTourDate(tourDate: InsertTourDate): Promise<TourDate>;
  getTourDates(): Promise<TourDate[]>;
  updateTourDate(id: number, tourDate: Partial<InsertTourDate>): Promise<TourDate>;
  deleteTourDate(id: number): Promise<void>;

  getPageContent(pageKey: string): Promise<PageContent | undefined>;
  getAllPageContent(): Promise<PageContent[]>;
  upsertPageContent(pageKey: string, content: string): Promise<PageContent>;

  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialsByPlacement(placement: string): Promise<Testimonial[]>;
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: number): Promise<void>;
}

export class Storage implements IStorage {
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createTourDate(tourDate: InsertTourDate): Promise<TourDate> {
    const [newTourDate] = await db.insert(tourDates).values(tourDate).returning();
    return newTourDate;
  }

  async getTourDates(): Promise<TourDate[]> {
    return await db.select().from(tourDates);
  }

  async updateTourDate(id: number, tourDate: Partial<InsertTourDate>): Promise<TourDate> {
    const [updated] = await db.update(tourDates).set(tourDate).where(eq(tourDates.id, id)).returning();
    return updated;
  }

  async deleteTourDate(id: number): Promise<void> {
    await db.delete(tourDates).where(eq(tourDates.id, id));
  }

  async getPageContent(pageKey: string): Promise<PageContent | undefined> {
    const [content] = await db.select().from(pageContent).where(eq(pageContent.pageKey, pageKey));
    return content;
  }

  async getAllPageContent(): Promise<PageContent[]> {
    return await db.select().from(pageContent);
  }

  async upsertPageContent(pageKey: string, content: string): Promise<PageContent> {
    const existing = await this.getPageContent(pageKey);
    if (existing) {
      const [updated] = await db.update(pageContent)
        .set({ content, updatedAt: new Date() })
        .where(eq(pageContent.pageKey, pageKey))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(pageContent)
        .values({ pageKey, content })
        .returning();
      return created;
    }
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  }

  async getTestimonialsByPlacement(placement: string): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(arrayContains(testimonials.placement, [placement]))
      .orderBy(asc(testimonials.sortOrder));
  }

  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updated] = await db.update(testimonials).set(testimonial).where(eq(testimonials.id, id)).returning();
    return updated;
  }

  async deleteTestimonial(id: number): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }
}

export const storage = new Storage();

import { db } from "./db";
import { contacts, tourDates, pageContent, type InsertContact, type Contact, type InsertTourDate, type TourDate, type InsertPageContent, type PageContent } from "@shared/schema";
import { desc, eq } from "drizzle-orm";

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
}

export const storage = new Storage();

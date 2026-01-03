import { db } from "./db";
import { contacts, tourDates, type InsertContact, type Contact, type InsertTourDate, type TourDate } from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Tour date methods
  createTourDate(tourDate: InsertTourDate): Promise<TourDate>;
  getTourDates(): Promise<TourDate[]>;
  deleteTourDate(id: number): Promise<void>;
}

export class Storage implements IStorage {
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Tour date methods
  async createTourDate(tourDate: InsertTourDate): Promise<TourDate> {
    const [newTourDate] = await db.insert(tourDates).values(tourDate).returning();
    return newTourDate;
  }

  async getTourDates(): Promise<TourDate[]> {
    return await db.select().from(tourDates);
  }

  async deleteTourDate(id: number): Promise<void> {
    await db.delete(tourDates).where(db.$with(tourDates).id.equals(id));
  }
}

export const storage = new Storage();

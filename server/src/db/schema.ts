import { serial, text, pgTable, timestamp, numeric, integer } from 'drizzle-orm/pg-core';

export const carsTable = pgTable('cars', {
  id: serial('id').primaryKey(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  body_style: text('body_style').notNull(), // SUV, sedan, coupe, convertible, etc.
  price_range_min: numeric('price_range_min', { precision: 10, scale: 2 }).notNull(), // Use numeric for monetary values
  price_range_max: numeric('price_range_max', { precision: 10, scale: 2 }).notNull(),
  key_features: text('key_features').array().notNull(), // PostgreSQL text array for features
  description: text('description').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript type for the table schema
export type Car = typeof carsTable.$inferSelect; // For SELECT operations
export type NewCar = typeof carsTable.$inferInsert; // For INSERT operations

// Important: Export all tables and relations for proper query building
export const tables = { cars: carsTable };
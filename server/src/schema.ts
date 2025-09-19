import { z } from 'zod';

// Car schema with proper field handling
export const carSchema = z.object({
  id: z.number(),
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  body_style: z.string(), // SUV, sedan, coupe, convertible, etc.
  price_range_min: z.number(), // Minimum price in USD
  price_range_max: z.number(), // Maximum price in USD
  key_features: z.array(z.string()), // Array of key features
  description: z.string(),
  created_at: z.coerce.date() // Automatically converts string timestamps to Date objects
});

export type Car = z.infer<typeof carSchema>;

// User preference input schema for car recommendations
export const carRecommendationInputSchema = z.object({
  brands: z.array(z.string()).optional(), // Preferred brands
  body_styles: z.array(z.string()).optional(), // Preferred body styles
  features: z.array(z.string()).optional(), // Desired features
  price_range_min: z.number().optional(), // Minimum budget
  price_range_max: z.number().optional(), // Maximum budget
  description: z.string().optional() // Free-form description of preferences
});

export type CarRecommendationInput = z.infer<typeof carRecommendationInputSchema>;

// Input schema for creating cars (admin functionality)
export const createCarInputSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1900).max(2030),
  body_style: z.string().min(1),
  price_range_min: z.number().positive(),
  price_range_max: z.number().positive(),
  key_features: z.array(z.string()).min(1),
  description: z.string().min(1)
});

export type CreateCarInput = z.infer<typeof createCarInputSchema>;

// Input schema for updating cars
export const updateCarInputSchema = z.object({
  id: z.number(),
  make: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  year: z.number().int().min(1900).max(2030).optional(),
  body_style: z.string().min(1).optional(),
  price_range_min: z.number().positive().optional(),
  price_range_max: z.number().positive().optional(),
  key_features: z.array(z.string()).optional(),
  description: z.string().min(1).optional()
});

export type UpdateCarInput = z.infer<typeof updateCarInputSchema>;

// Response schema for car recommendations
export const carRecommendationResponseSchema = z.object({
  recommendations: z.array(carSchema),
  total_count: z.number(),
  filters_applied: z.object({
    brands: z.array(z.string()).optional(),
    body_styles: z.array(z.string()).optional(),
    price_range_min: z.number().optional(),
    price_range_max: z.number().optional(),
    features_matched: z.number().optional()
  })
});

export type CarRecommendationResponse = z.infer<typeof carRecommendationResponseSchema>;
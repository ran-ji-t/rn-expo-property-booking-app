import { z } from "zod";

export const Propertyz = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  features: z.array(z.string()),
  images: z.array(z.string()),
});
export const Bookingz = z.object({
  id: z.string(),
  propertyId: z.string(),
  userId: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  status: z.string(),
});

export type Property = z.infer<typeof Propertyz>;
export type Booking = z.infer<typeof Bookingz>

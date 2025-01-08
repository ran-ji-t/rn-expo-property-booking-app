import { z } from "zod";

export const Profilez = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  bookings: z.array(z.string()),
});

export type Profile = z.infer<typeof Profilez>;

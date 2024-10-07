import { z } from "zod";

const fileSchema = typeof File !== "undefined" 
  ? z.instanceof(File, { message: "Profile image is required" })
  : z.any(); // Fallback for server-side environments

export const submissionSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(6).max(1000),
  image: fileSchema.optional(), // Validates file if it's a browser environment
});

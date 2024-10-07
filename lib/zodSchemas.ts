import {z} from "zod"

export const submissionSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    message: z.string().min(6).max(1000),
    image: z.instanceof(File, {message: "Profile is required"}).optional(),
})
import z from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

const signupSchema = z.object({
  username: z.string().min(4, "Username must be at least 6 characters"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupSchema = z.infer<typeof signupSchema>;

export { loginSchema, type LoginSchema, signupSchema, type SignupSchema };

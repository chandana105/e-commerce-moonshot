import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if the email already exists
        const emailExist = await ctx.db.user.findUnique({
          where: { email: input.email },
        });
        if (emailExist) {
          throw new Error("Email already exists");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(input.password, 10);

        // Create the new user
        const newUser = await ctx.db.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
          },
        });

        return newUser;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating user:", error.message);
          throw new Error(error.message || "Failed to create user");
        } else {
          // Handle unexpected error types
          console.error("Unexpected error:", error);
          throw new Error("Failed to create user due to unexpected error");
        }
      }
    }),
});

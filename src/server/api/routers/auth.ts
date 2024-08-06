import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is not defined");
}

export const userRouter = createTRPCRouter({
  // signup procedure
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Checking if the email already exists
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
          // Handling unexpected error types
          console.error("Unexpected error:", error);
          throw new Error("Failed to create user due to unexpected error");
        }
      }
    }),

  // login procedure
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Find the user by email
        const user = await ctx.db.user.findUnique({
          where: { email: input.email },
        });

        // Validating user and password
        if (user && (await bcrypt.compare(input.password, user.password))) {
          const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
            expiresIn: "24h",
          });
          return {
            success: true,
            token,
            message: "User authenticated successfully",
          };
        } else {
          return {
            success: false,
            message: "Email or password incorrect",
          };
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        throw new Error("Authentication failed");
      }
    }),
});

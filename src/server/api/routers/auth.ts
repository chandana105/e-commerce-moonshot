import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "~/app/utils/sendVerificationEmail";

const JWT_SECRET_KEY = process.env.SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is not defined");
}

export const authRouter = createTRPCRouter({
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
        // Generating a one-time verification token
        const otp = Math.floor(10000000 + Math.random() * 90000000); // Generate an 8-digit OTP

        // Performing the transaction
        const result = await ctx.db.$transaction(async (prisma) => {
          // Create the new user with unverified email status
          const newUser = await prisma.user.create({
            data: {
              name: input.name,
              email: input.email,
              password: await bcrypt.hash(input.password, 10),
              isVerified: false,
              otp, // Saving OTP temporarily
            },
          });

          // Sending verification email
          const emailResponse = await sendVerificationEmail({
            email: input.email,
            name: input.name,
            otp,
          });

          if (!emailResponse.success) {
            throw new Error(emailResponse.message);
          }

          // Return the new user if successful
          return newUser;
        });

        return result;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating user:", error.message);
          throw new Error(error.message || "Failed to create user");
        } else {
          console.error("Unexpected error:", error);
          throw new Error("Failed to create user due to unexpected error");
        }
      }
    }),

  // verify email procedure
  verifyEmail: publicProcedure
    .input(
      z.object({
        otp: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Finding the user by OTP
        const user = await ctx.db.user.findFirst({
          where: { otp: input.otp },
        });

        if (!user) {
          return { success: false, message: "Invalid OTP" };
        }

        // Updating the user's email verification status with user's unique ID
        await ctx.db.user.update({
          where: { id: user.id }, 
          data: { isVerified: true, otp: null },
        });

        return {
          success: true,
          message:
            "Email verified successfully, Kindly Login to access Dashboard. ",
        };
      } catch (error) {
        console.error("Error verifying email:", error);
        throw new Error("Email verification failed");
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

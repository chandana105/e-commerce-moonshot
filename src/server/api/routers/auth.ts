import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "~/app/utils/sendVerificationEmail";

const JWT_SECRET_KEY = process.env.SECRET_KEY;

if (!JWT_SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is not defined");
}

const OTP_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

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
        const otp = Math.floor(10000000 + Math.random() * 90000000); // Generating an 8-digit OTP

        // Check if the user already exists
        const existingUser = await ctx.db.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          return {
            success: false,
            message: "Email already exists",
          };
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);
        // Create a temporary user with the OTP
        const tempUser = await ctx.db.tempUser.create({
          data: {
            email: input.email,
            name: input.name,
            password: hashedPassword, // Hash the password
            otp,
          },
        });

        // Send the OTP via email
        const emailResponse = await sendVerificationEmail({
          email: input.email,
          name: input.name,
          otp,
        });

        if (!emailResponse.success) {
          throw new Error(emailResponse.message);
        }

        return {
          success: true,
          tempUser: tempUser,
          message: "OTP sent successfully!",
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating temp user:", error.message);
          throw new Error(error.message || "Failed to create temp user");
        } else {
          console.error("Unexpected error:", error);
          throw new Error("Failed to create temp user due to unexpected error");
        }
      }
    }),

  // verify email procedure
  verifyEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        otp: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const currentTime = new Date();

        // Find the temporary user with the OTP
        const tempUser = await ctx.db.tempUser.findFirst({
          where: {
            email: input.email,
            otp: input.otp,
            otpCreatedAt: {
              gte: new Date(currentTime.getTime() - OTP_EXPIRATION_TIME),
            },
          },
        });

        if (!tempUser) {
          return { success: false, message: "Invalid or expired OTP" };
        }

        // Create the main user
        const newUser = await ctx.db.user.create({
          data: {
            email: tempUser.email,
            name: tempUser.name,
            password: tempUser.password,
            isVerified: true, // Set as verified
          },
          select: {
            id: true,
            email: true,
            name: true,
            isVerified: true,
            interests: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        // Delete the temporary user
        await ctx.db.tempUser.delete({
          where: { id: tempUser.id },
        });

        return {
          success: true,
          message:
            "Email verified successfully,New user registered successfully! Kindly Login to access Dashboard",
          user: newUser,
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

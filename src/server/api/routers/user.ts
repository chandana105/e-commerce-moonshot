import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

// for user routes

const addRemoveInterestSchema = z.object({
  userId: z.number(),
  interestId: z.number(),
});

export const userRouter = createTRPCRouter({
  getAllCategories: protectedProcedure.query(async ({ ctx }) => {
    try {
      const categoriesData = await ctx.db.interest.findMany();
      return categoriesData ?? null;
    } catch (error) {
      console.error("Error retrieving categoriesData:", error);
      throw new Error("Error retrieving categoriesData");
    }
  }),
  getUserData: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
        include: { interests: true },
      });
      return user ?? null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw new Error("Error retrieving user data");
    }
  }),
  //   post user update the user to post about interests

  addUserInterest: protectedProcedure
    .input(addRemoveInterestSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: { id: input.userId },
          data: {
            interests: {
              connect: { id: input.interestId },
            },
          },
        });
      } catch (error) {
        console.error("Error adding interest:", error);
        throw new Error("Error adding interest");
      }
    }),

  removeUserInterest: protectedProcedure
    .input(addRemoveInterestSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: { id: input.userId },
          data: {
            interests: {
              disconnect: { id: input.interestId },
            },
          },
        });
      } catch (error) {
        console.error("Error removing interest:", error);
        throw new Error("Error removing interest");
      }
    }),
});

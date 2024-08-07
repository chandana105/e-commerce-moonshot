import { createTRPCRouter, protectedProcedure } from "../trpc";

// for user routes

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
      });
      return user ?? null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      throw new Error("Error retrieving user data");
    }
  }),

  //   post user update the user to post about interests
});

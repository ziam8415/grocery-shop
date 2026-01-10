import { prisma } from "../../../utils/prisma";

const createCategory = async (data: any) => {
  return prisma.category.create({ data });
};

const getCategoriesWithSub = async () => {
  return prisma.category.findMany({
    where: { parentId: null },
    include: {
      children: true,
    },
  });
};

export const CategoryService = {
  createCategory,
  getCategoriesWithSub,
};

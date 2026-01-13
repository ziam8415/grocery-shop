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

//get category by slug
const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      children: true,
    },
  });
};

//update category
const updateCategory = async (id: string, data: any) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

//get products by category slug
const getProductsByCategorySlug = async (slug: string) => {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: true,
      children: {
        include: {
          products: true,
        },
      },
    },
  });
};

//delete category
const deleteCategoryWithRelations = async (categoryId: string) => {
  return prisma.$transaction(async (tx) => {
    // 1️⃣ Find sub-categories
    const subCategories = await tx.category.findMany({
      where: { parentId: categoryId },
      select: { id: true },
    });

    const subCategoryIds = subCategories.map((sc) => sc.id);

    // 2️⃣ Delete products under sub-categories
    if (subCategoryIds.length > 0) {
      await tx.product.deleteMany({
        where: { categoryId: { in: subCategoryIds } },
      });
    }

    // 3️⃣ Delete products under parent category
    await tx.product.deleteMany({
      where: { categoryId },
    });

    // 4️⃣ Delete sub-categories
    await tx.category.deleteMany({
      where: { parentId: categoryId },
    });

    // 5️⃣ Delete parent category
    return tx.category.delete({
      where: { id: categoryId },
    });
  });
};

export const CategoryService = {
  createCategory,
  getCategoriesWithSub,
  getCategoryBySlug,
  updateCategory,
  getProductsByCategorySlug,
  deleteCategoryWithRelations,
};

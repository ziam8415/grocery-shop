import { prisma } from "../../../utils/prisma";

const createProduct = async (data: any) => {
  return prisma.product.create({
    data,
  });
};

const getAllProducts = async () => {
  return prisma.product.findMany();
};

const getProductsBySubCategory = async (categoryId: string) => {
  return prisma.product.findMany({
    where: { categoryId },
    include: {
      category: true,
    },
  });
};

const getProductById = async (productId: string) => {
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: true,
    },
  });
};

const deleteProduct = async (productId: string) => {
  return prisma.product.delete({
    where: { id: productId },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductsBySubCategory,
  getProductById,
  deleteProduct,
};

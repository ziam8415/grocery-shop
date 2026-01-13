import { prisma } from "../../../utils/prisma";

const createProduct = async (payload: any) => {
  return prisma.product.create({
    data: payload,
  });
};

const getAllProducts = async (query: any) => {
  const { search, minPrice, maxPrice, category } = query;

  return prisma.product.findMany({
    where: {
      name: search ? { contains: search, mode: "insensitive" } : undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      },
      categoryId: category || undefined,
      // vendorId: vendorId || undefined,
    },
    include: {
      category: true,
      // vendor: true,
    },
  });
};

const getSingleProduct = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      // vendor: true,
    },
  });
};

const updateProduct = async (id: string, payload: any) => {
  return prisma.product.update({
    where: { id },
    data: payload,
  });
};

const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};

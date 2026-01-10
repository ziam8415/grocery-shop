import { prisma } from "../../../utils/prisma";

const createOrder = async (userId: string, items: any[]) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      totalAmount,
      orderItems: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });

  return order;
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: { product: true },
      },
    },
  });
};

const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: true,
    },
  });
};

const updateOrderStatus = async (id: string, status: any) => {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};

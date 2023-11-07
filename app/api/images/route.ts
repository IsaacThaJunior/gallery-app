import prisma from "@/prisma/prisma";

export const GET = async (req: Request) => {
  const allImages = await prisma.image.findMany();
  return new Response(JSON.stringify(allImages), { status: 200 });
};

export const POST = async (req: Request) => {
  const { address, label, numberOfRooms, price, Images } = await req.json();

  const postedImages = await prisma.image.create({
    data: {
      Images,
      price,
      address,
      label,
      numberOfRooms,
    },
  });

  return new Response(JSON.stringify(postedImages), { status: 201 });
};
export const DELETE = async (req: Request) => {};

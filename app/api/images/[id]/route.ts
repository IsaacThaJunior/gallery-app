import prisma from "@/prisma/prisma";

interface ImageParams {
  id?: string;
}

export const GET = async (
  req: Request,
  { params }: { params: ImageParams }
) => {
  const { id } = params;
  const image = await prisma.image.findUnique({
    where: {
      id,
    },
  });

  return new Response(JSON.stringify(image), { status: 200 });
};

export const PATCH = async (
  req: Request,
  { params }: { params: ImageParams }
) => {
  const { id } = params;
  const { address, label, numberOfRooms, price, Images } = await req.json();
  const updatedImage = await prisma.image.update({
    where: {
      id,
    },
    data: {
      address,
      label,
      numberOfRooms,
      price,
      Images,
    },
  });
  return new Response(JSON.stringify(updatedImage), { status: 201 });
};

export const DELETE = async (
  req: Request,
  { params }: { params: ImageParams }
) => {
  const { id } = params;
  await prisma.image.delete({
    where: {
      id,
    },
  });

  return new Response("Deleted Successfully", {
    status: 200,
  });
};

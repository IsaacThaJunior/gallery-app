import prisma from "@/prisma/prisma";

export const GET = async (req: Request) => {
  console.log("Someone is searching");
  const allImages = await prisma.image.findMany();
  return new Response(JSON.stringify(allImages), { status: 200 });
};

export const POST = async (req: Request) => {
  const { title, Images } = await req.json();

  const postedImages = await prisma.image.create({
    data: {
      title,
      Images,
    },
  });

  return new Response(JSON.stringify(postedImages), { status: 201 });
};

import prisma from "@/prisma/prisma";

export const GET = async (req: Request) => {
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
export const DELETE = async (req: Request) => {
  const { index } = await req.json();

  try {
    const matchingImage = await prisma.image.findMany({});
    const consolidatedImages = matchingImage
      .map((image) => image.Images)
      .flat();

    consolidatedImages.splice(index, 1);

    const deleteEverything = await prisma.image.deleteMany();

    await prisma.image.create({
      data: {
        Images: consolidatedImages,
      },
    });

    return new Response("Image deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting image", { status: 500 });
  }
};

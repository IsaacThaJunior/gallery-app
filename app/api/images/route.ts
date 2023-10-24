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

    console.log("first one", consolidatedImages);
    const removed = consolidatedImages.splice(index, 1);
    console.log(removed);
    console.log("second one", consolidatedImages);

    const deleteEverything = await prisma.image.deleteMany();
    console.log(deleteEverything);

    const createdImages = await prisma.image.create({
      data: {
        Images: consolidatedImages,
      },
    });

    console.log(createdImages);

    return new Response("Image deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting image:", error);
    return new Response("Error deleting image", { status: 500 });
  }
};

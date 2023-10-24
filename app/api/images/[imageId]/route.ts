import prisma from "@/prisma/prisma";

interface AboutParams {
  imageId?: string;
}
export const DELETE = async (
  req: Request,
  { params }: { params: AboutParams }
) => {
  const { imageId } = params;
  console.log("Here is the imageId: ", imageId);
  console.log("This is coming from the slug file");

  // try {
  //   // Use Prisma to delete the image by ID
  //   const deletedImage = await prisma.image.delete({
  //     where: {
  //       id: imageId,
  //     },
  //   });

  //   return new Response(JSON.stringify(deletedImage), { status: 200 });
  // } catch (error) {
  //   console.error("Error deleting image:", error);
  //   return new Response("Error deleting image", { status: 500 });
  // }
};

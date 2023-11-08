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

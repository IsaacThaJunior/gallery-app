"use server";

import axios from "axios";
import prisma from "@/prisma/prisma";

export const getFromDB = async () => {
  const image = await prisma.image.findMany();
  if (!image) return null;
  return image;
};

export const getOneImageFromDB = async (id: any) => {
  const image = await prisma.image.findUnique({
    where: {
      id,
    },
  });
  if (!image) return null;
  return image;
};

export const deleteFromDB = async (id: any) => {
  const request = await prisma.image.delete({
    where: {
      id,
    },
  });
  return request;
};

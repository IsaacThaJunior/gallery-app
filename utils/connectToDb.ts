"use server";

import axios from "axios";
import prisma from "@/prisma/prisma";

export const getFromDB = async () => {
  const image = await prisma.image.findMany();
  if (!image) return null;
  return image;
};

export const deleteFromDB = async (requestData: any) => {
  const request = axios.delete("/api/images", {
    data: requestData,
  });
  return request;
};

import axios from "axios";

export const getFromDB = async () => {
  try {
    const request = await axios.get("/api/images");
    const allImages = request.data.map((image: any) => image.Images).flat();
    return allImages;
  } catch (error) {
    console.error("Error fetching images from the database:", error);
  }
};

export const deleteFromDB = async (requestData: any) => {
  const request = axios.delete("/api/images", {
    data: requestData,
  });
  return request;
};

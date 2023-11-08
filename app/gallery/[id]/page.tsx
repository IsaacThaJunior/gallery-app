"use client";

import { useParams } from "next/navigation";
import React from "react";
import { getOneImageFromDB } from "@/utils/connectToDb";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

function page() {
  const params = useParams();
  const pictureID = params.id!;
  const [imageGotten, setImageGotten] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    getImagesToDatabase(pictureID);
  }, []);

  const getImagesToDatabase = async (id: any) => {
    try {
      setLoading(true);

      const request = await getOneImageFromDB(id);
      setImageGotten(request);
      console.log(request?.id);
      setLoading(false);
    } catch (error) {}
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", // Two equal columns
          gap: "20px", // Gap between columns
          px: 6,
        }}
      >
        {loading === false && imageGotten.length !== 0 && (
          <Image
            src={imageGotten.Images}
            alt={imageGotten.label}
            width={400}
            height={300}
          />
        )}

        <div>
          {loading === false && imageGotten && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h4" marginBottom="2rem">
                label of house: {imageGotten.label}
              </Typography>
              <Typography variant="h4" marginBottom="2rem">
                House address: {imageGotten.address}
              </Typography>
              <Typography variant="h4" marginBottom="2rem">
                Number of Rooms : {imageGotten.numberOfRooms}
              </Typography>
              <Typography variant="h4" marginBottom="2rem">
                Price : ${imageGotten.price}
              </Typography>
            </Box>
          )}
        </div>
      </Box>
    </>
  );
}

export default page;

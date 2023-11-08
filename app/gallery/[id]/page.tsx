"use client";

import { useParams } from "next/navigation";
import React from "react";
import { getOneImageFromDB, deleteFromDB } from "@/utils/connectToDb";
import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function page() {
  const router = useRouter();
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
      setLoading(false);
    } catch (error) {}
  };

  const deleteImage = async (id: any) => {
    const answer = confirm("Are you sure you want to delete this image");

    if (answer === true) {
      try {
        setLoading(true);
        await deleteFromDB(id);
        setLoading(false);
        router.push("/");
      } catch (error) {}
    }
  };

  return (
    <>
      {loading === true ? (
        <Typography variant="h4" marginBottom="2rem" textAlign="center">
          Loading! Please wait
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "10rem",
              alignItems: "center",
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
                  <Typography variant="h5" marginBottom="2rem">
                    label of house: {imageGotten.label}
                  </Typography>
                  <Typography variant="h5" marginBottom="2rem">
                    House address: {imageGotten.address}
                  </Typography>
                  <Typography variant="h5" marginBottom="2rem">
                    Number of Rooms : {imageGotten.numberOfRooms} rooms
                  </Typography>
                  <Typography variant="h5" marginBottom="2rem">
                    Price : ${imageGotten.price}
                  </Typography>
                </Box>
              )}
            </div>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px", // Gap between columns
              px: 3,
            }}
          >
            <Link href={`/gallery/${imageGotten.id}/edit`}>
              <Button
                variant="contained"
                // color="error"
                sx={{
                  ml: 12,
                  mt: 10,
                  // p: 2,
                }}
              >
                Edit this image
              </Button>
            </Link>

            <Button
              variant="contained"
              color="error"
              sx={{
                ml: 12,
                mt: 10,
                // p: 2,
              }}
              onClick={() => deleteImage(imageGotten.id)} // Pass the image ID to the delete function
            >
              Delete this image
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default page;

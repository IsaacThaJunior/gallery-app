"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

import axios from "axios";
import { useState, useEffect } from "react";

export default function page() {
  const [uploadedImages, setUploadedImages] = useState([] as string[]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    sendImagesToDatabase();
  }, []); // This will run whenever uploadedImages change

  const sendImagesToDatabase = async () => {
    try {
      setLoading(true);
      const request = await axios.get("/api/images");
      const allImages = request.data.map((image: any) => image.Images).flat();
      setUploadedImages(allImages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images from the database:", error);
    }
  };

  const deleteImage = async (imageId: any) => {
    const answer = await confirm("Are you sure you want to delete this image");
    const requestData = {
      index: imageId,
    };
    if (answer === true) {
      //   try {
      axios
        .delete("/api/images", {
          data: requestData,
        })
        .then((response) => {
          if (response.status === 200) {
            sendImagesToDatabase();
            console.log("Image deleted successfully");
          } else {
            console.error("Error deleting image:", response.status);
          }
        })
        .catch((error) => {
          console.error("Error sending DELETE request:", error);
        });
    }
  };

  return (
    <Box
      sx={{
        px: 6,
      }}
    >
      <Typography variant="h5" marginBottom="2rem" textAlign="center">
        All Images
      </Typography>

      {loading === true ? (
        <Typography variant="h5" marginBottom="2rem" textAlign="center">
          Loading! Please wait
        </Typography>
      ) : (
        <Grid container justifyContent="center" spacing={15}>
          {uploadedImages.map((url, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <div>
                <Image
                  src={url}
                  alt={`Image ${index}`}
                  width={300}
                  height={200}
                />

                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    ml: 12,
                    mt: 3,
                  }}
                  onClick={() => deleteImage(index)} // Pass the image ID to the delete function
                >
                  Delete
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

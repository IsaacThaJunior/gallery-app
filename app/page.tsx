"use client";

import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

import axios from "axios";
import { useState, useEffect } from "react";

export default function page() {
  const [uploadedImages, setUploadedImages] = useState([] as string[]);

  useEffect(() => {
    // Create a function to send all images to the database
    const sendImagesToDatabase = async () => {
      try {
        const request = await axios.get("/api/images");
        const allImages = request.data.map((image: any) => image.Images).flat();
        console.log(allImages);
        setUploadedImages(allImages);
      } catch (error) {
        console.error("Error fetching images from the database:", error);
      }
    };

    // Check if there are images to send and then call the function

    sendImagesToDatabase();
  }, []); // This will run whenever uploadedImages change
  return (
    <Box
      sx={{
        px: 6,
      }}
    >
      <Typography variant="h5" marginBottom="2rem" textAlign="center">
        All Images
      </Typography>

      <Grid container justifyContent="center" spacing={3}>
        {uploadedImages.map((url, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Image src={url} alt={`Image ${index}`} width={300} height={200} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";

import { useState, useEffect } from "react";
import { deleteFromDB, getFromDB } from "@/utils/connectToDb";
import Link from "next/link";

export default function page() {
  const [uploadedImages, setUploadedImages] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    sendImagesToDatabase();
  }, []); // This will run whenever uploadedImages change

  const sendImagesToDatabase = async () => {
    try {
      setLoading(true);
      const request = await getFromDB();
      setUploadedImages(request);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images from the database:", error);
    }
  };

  return (
    <Box
      sx={{
        px: 6,
      }}
    >
      <Typography variant="h4" marginBottom="2rem" textAlign="center">
        All Images
      </Typography>

      {loading === true ? (
        <Typography variant="h5" marginBottom="2rem" textAlign="center">
          Loading! Please wait
        </Typography>
      ) : (
        <Grid container justifyContent="center" spacing={15}>
          {uploadedImages?.map((image: any) => (
            <Grid item key={image.id} xs={12} sm={6} md={4} lg={3}>
              <div>
   done the deleting part            <Link href={`/gallery/${image.id}`}>
                  <Image
                    style={{ cursor: "pointer" }}
                    src={image.Images}
                    alt={`Image ${image.address}`}
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
            </Grid>
          ))}
        </Grid>
      )}

      {loading === false && uploadedImages.length === 0 && (
        <Typography
          variant="h6"
          sx={{
            mt: 20,
          }}
          textAlign="center"
        >
          No images in the Database. Please Upload images and then view them
          here
        </Typography>
      )}
    </Box>
  );
}

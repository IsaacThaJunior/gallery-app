"use client";

import { Typography } from "@mui/material";
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
    <>
      <Typography>All Images</Typography>

      <div>
        {uploadedImages.map((url, index) => (
          <div key={index}>
            <Image src={url} alt={`Image ${index}`} width={300} height={200} />
          </div>
        ))}
      </div>
    </>
  );
}

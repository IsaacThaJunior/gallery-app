"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { CldUploadWidget, CldUploadButton, CldImage } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

interface UploadResult {
  info: {
    files: [];
    public_id: string;
    secure_url: string;
  };
}

const uploadPreset = "sj9mklh4";

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState([] as string[]);

  useEffect(() => {
    // Create a function to send all images to the database
    const sendImagesToDatabase = async () => {
      try {
        await axios.post("/api/images", { Images: uploadedImages });
        console.log("Images saved to the database!");
      } catch (error) {
        console.error("Error saving images to the database:", error);
      }
    };

    // Check if there are images to send and then call the function
    if (uploadedImages.length > 0) {
      sendImagesToDatabase();
    }
  }, [uploadedImages]); // This will run whenever uploadedImages change

  const handleUpload = async (result: UploadResult) => {
    // Get the secure URL from the result and add it to the state array.
    const mappedData = result?.info?.files.map((file: any) => {
      return file.uploadInfo.secure_url;
    });

    setUploadedImages(mappedData);
  };

  return (
    <main className={styles.main}>
      <CldUploadButton
        onQueuesEnd={handleUpload}
        uploadPreset={uploadPreset}
        options={{ maxFiles: 3, clientAllowedFormats: ["png", "jpeg"] }}
      />

      <div className={styles.imagesContainer}>
        {uploadedImages.map((url, index) => (
          <div key={index}>
            <Image src={url} alt={`Image ${index}`} width={300} height={200} />
          </div>
        ))}
      </div>
    </main>
  );
}

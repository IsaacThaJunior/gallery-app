"use client";
import { Typography, Select, MenuItem, Button, Box, Grid } from "@mui/material";
import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import styles from "../page.module.css";
import { styled } from "@mui/system";

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

const Root = styled("div")({
  position: "relative",
  width: "300px",
  height: "200px",
});

const Overlay = styled("div")({
  // display: "none",
  position: "absolute",
  top: 0,
  left: 0,
  textAlign: "center",
  width: "100%",
  height: "30%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
});

const SelectInput = styled(Select)({
  width: "200px",
  marginBottom: 2,
});

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState([] as string[]);
  const [mainImage, setMainImage] = useState("");

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
    const mappedData = result?.info?.files.map((file: any) => {
      return file.uploadInfo.secure_url;
    });

    setUploadedImages(mappedData);
    if (!mainImage && mappedData.length > 0) {
      setMainImage(mappedData[0]);
    }
  };

  const handleMainImageChange = (event: any) => {
    setMainImage(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 6,
          py: 3,
        }}
      >
        <Typography variant="h5">Upload Section</Typography>

        {uploadedImages.length > 0 && (
          <SelectInput
            label="Select Main Image"
            value={mainImage}
            onChange={handleMainImageChange}
          >
            {uploadedImages.map((url, index) => (
              <MenuItem key={index} value={url}>
                Image {index + 1}
              </MenuItem>
            ))}
          </SelectInput>
        )}

        <CldUploadButton
          className={styles.button}
          onQueuesEnd={handleUpload}
          uploadPreset={uploadPreset}
          options={{ maxFiles: 3, clientAllowedFormats: ["png", "jpeg"] }}
        >
          Upload button
        </CldUploadButton>
      </Box>

      <main>
        <div>
          <Typography variant="h6">
            Use the dropdown above to select your main image
          </Typography>
        </div>

        <Grid container spacing={3}>
          {uploadedImages.map((url, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Root
                key={index}
                className={styles.mainImage}
                onClick={(e) =>
                  handleMainImageChange({ target: { value: url } })
                }
              >
                {mainImage === url && (
                  <Overlay>
                    <Typography variant="h6" color="white">
                      Main Image
                    </Typography>
                  </Overlay>
                )}

                <Image
                  src={url}
                  alt={`Image ${index}`}
                  width={300}
                  height={200}
                />
              </Root>
            </Grid>
          ))}
        </Grid>
      </main>
    </>
  );
}

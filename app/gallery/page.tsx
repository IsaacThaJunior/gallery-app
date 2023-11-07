"use client";
import {
  Typography,
  Select,
  MenuItem,
  Box,
  TextField,
  Grid,
  Button,
  Container,
} from "@mui/material";
import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import styles from "../page.module.css";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";

declare global {
  var cloudinary: any;
}

const uploadPreset = "sj9mklh4";

const Root = styled("div")({
  position: "relative",
  width: "300px",
  height: "200px",
});

const TextDiv = styled("div")({
  textAlign: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
});

const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  textAlign: "center",
  width: "100%",
  height: "20%",
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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const address = watch("address");
  const label = watch("label");
  const numberOfRooms = watch("numberOfRooms");
  const price = watch("price");

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

    const submitHandler = () => {}

    // Check if there are images to send and then call the function
    if (uploadedImages.length > 0) {
      sendImagesToDatabase();
    }
  }, [uploadedImages]); // This will run whenever uploadedImages change

  const handleUpload = async (result: any) => {
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
        <Container>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="House Address"
                  variant="outlined"
                  {...register("address", {
                    required: "Required",
                  })}
                  name="address"
                  error={!!errors.address}
                />
                {errors.address?.message && <span>This field is required</span>}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Label your images"
                  variant="outlined"
                  {...register("label", {
                    required: "Required",
                  })}
                  name="label"
                  error={!!errors.label}
                />
                {errors.address?.message && <span>This field is required</span>}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Number of Bedrooms"
                  variant="outlined"
                  type="number"
                  {...register("numberOfRooms", {
                    required: "Required",
                  })}
                  name="numberOfRooms"
                  error={!!errors.numberOfRooms}
                />
                {errors.address?.message && <span>This field is required</span>}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  type="number"
                  {...register("price", {
                    required: "Required",
                  })}
                  name="price"
                  error={!!errors.price}
                />
                {errors.address?.message && <span>This field is required</span>}
              </Grid>
            </Grid>

            {uploadedImages.length > 0 ? (
              <TextDiv>
                <Typography variant="h6">
                  Use the dropdown above to select your main image
                </Typography>
              </TextDiv>
            ) : (
              <TextDiv>
                <Typography variant="h5">
                  No images yet. Please click the upload button to upload images
                </Typography>
              </TextDiv>
            )}

            <Grid container justifyContent="center" spacing={3}>
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

            <Grid container justifyContent="center">
              <Button
                sx={{ mt: "1rem", px: 7 }}
                variant="contained"
                color="primary"
                type="submit"
                // disabled={uploadedImages.length === 0}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Container>
      </main>
    </>
  );
}

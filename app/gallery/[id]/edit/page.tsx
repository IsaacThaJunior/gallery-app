"use client";
import {
  Typography,
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
import { useRouter } from "next/navigation";

declare global {
  var cloudinary: any;
}

const uploadPreset = "sj9mklh4";

const TextDiv = styled("div")({
  textAlign: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
});

export default function Home() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: "",
      label: "",
      numberOfRooms: 0,
      price: 0,
      Images: "",
    },
  });

  const handleUpload = async (result: any) => {
    setUploadedImages(result.info.secure_url);
  };

  const submitHandler = async (values: any) => {
    const data = {
      ...values,
      numberOfRooms: +values.numberOfRooms,
      price: +values.price,
      address: values.address.trim(),
      Images: uploadedImages,
      label: values.label.trim(),
    };

    try {
      await axios.post("/api/images", data);
      console.log("Images saved to the database!");
    } catch (error) {
      console.error("Error saving images to the database:", error);
    }

    router.push("/");
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

        {/* {uploadedImages.length > 0 && (
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
        )} */}

        <CldUploadButton
          className={styles.button}
          onUpload={handleUpload}
          uploadPreset={uploadPreset}
          options={{ maxFiles: 3, clientAllowedFormats: ["png", "jpeg"] }}
        >
          Upload button
        </CldUploadButton>
      </Box>

      <main>
        <Container>
          <form onSubmit={handleSubmit(submitHandler)}>
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

            {!uploadedImages && (
              <TextDiv>
                <Typography variant="h5">
                  No images yet. Please click the upload button to upload images
                </Typography>
              </TextDiv>
            )}

            <Grid container justifyContent="center" spacing={3}>
              {uploadedImages && uploadedImages.length !== 0 && (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Image
                    src={uploadedImages}
                    alt={`Image ${uploadedImages}`}
                    width={300}
                    height={200}
                  />
                </Grid>
              )}
            </Grid>

            <Grid container justifyContent="center">
              <Button
                sx={{ mt: "1rem", px: 7 }}
                variant="contained"
                color="primary"
                type="submit"
                disabled={uploadedImages?.length === 0}
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

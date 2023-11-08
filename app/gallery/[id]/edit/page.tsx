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
import styles from "../../../page.module.css";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { getOneImageFromDB } from "@/utils/connectToDb";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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
  const [request, setRequest] = useState<any>();
  const [loadings, setLoadings] = useState<Boolean>(true);
  const params = useParams();
  const pictureID = params.id!;

  useEffect(() => {
    if (pictureID) {
      getImage(pictureID);
    }
  }, []);

  const getImage = async (id: any) => {
    setLoadings(true);
    const request = await getOneImageFromDB(id);
    if (request) {
      setRequest(request);
      setValue("price", request.price);
      setValue("numberOfRooms", request.numberOfRooms);
      setValue("address", request.address);
      setValue("label", request.label);
    }
    setLoadings(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
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
      Images: uploadedImages || request.Images as string,
      label: values.label.trim(),
    };

    try {
      await axios.patch(`/api/images/${pictureID}`, data);
      console.log("Images Updated Successfully");
      router.push("/");
    } catch (error) {
      console.error("Error saving images to the database:", error);
    }
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
        <Typography variant="h5">Edit the image Section</Typography>

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

            {!uploadedImages && !request && (
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

              {loadings === false &&
                request &&
                request.length !== 0 &&
                !uploadedImages && (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Image
                      src={request.Images}
                      alt={`Image ${request}`}
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

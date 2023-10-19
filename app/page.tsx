"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { CldUploadWidget } from "next-cloudinary";

declare global {
  var cloudinary: any;
}

const uploadPreset = "sj9mklh4";

export default function Home() {
  return (
    <main className={styles.main}>
      <CldUploadWidget
        // onUpload={handleUpload}
        uploadPreset={uploadPreset}
        options={{ maxFiles: 1, clientAllowedFormats: ["png", "jpeg"] }}
      ></CldUploadWidget>
    </main>
  );
}

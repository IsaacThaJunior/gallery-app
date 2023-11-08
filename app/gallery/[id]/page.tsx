'use client'

import { useParams } from "next/navigation";
import React from "react";

function page() {
  const params = useParams();
  const pictureID = params.id!;

  return (
    <>
      <h1>Here is the param: {pictureID}</h1>
    </>
  );
}

export default page;

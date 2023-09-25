import { Alert, Spinner } from "@/components/bootstarp";
import { UnsplashModel } from "@/models/unsplash-model";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Dynamic fetching Nextjs Image Gallery ",
};

// export const revalidate = 0;

const Dynamic = async () => {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPALSH_ACCESS_KEY,
    {
      //  cache: "no-cache" ,
      next: { revalidate: 0 },
    }
  );
  const image: UnsplashModel = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center p-3">
      <Alert>
        This page <strong>featches data dynamicaly.</strong>Every time you
        refresh the page. you get new image from Unsplash API
      </Alert>
      <Image
        blurDataURL={image.urls.raw}
        placeholder="blur"
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded mw-100 h-100 shadow"
      />
      by{" "}
      <Link href={"/user/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
};

export default Dynamic;

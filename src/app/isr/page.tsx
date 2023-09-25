import { Alert } from "@/components/bootstarp";
import { UnsplashModel } from "@/models/unsplash-model";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Incremintal Static Regenration fetching -Nextjs Image Gallery ",
};

// export const revalidate = 0;

const Isr = async () => {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPALSH_ACCESS_KEY,
    {
      //  cache: "no-cache" ,
      next: { revalidate: 15 },
    }
  );
  const image: UnsplashModel = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center p-3">
      <Alert>
        This page was <strong>Incremintal static Regenration. </strong>Every
        15sec after you refresh the page. you get new image from Unsplash API
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded mw-100 h-100 shadow"
      />
      by{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
    </div>
  );
};

export default Isr;

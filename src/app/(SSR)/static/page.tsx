import { Alert } from "@/components/bootstarp";
import { UnsplashModel } from "@/models/unsplash-model";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Static fetching Nextjs Image Gallery ",
};

const Page = async () => {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPALSH_ACCESS_KEY
  );
  const image: UnsplashModel = await response.json();
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center p-3">
      <Alert>
        This page <strong>featches and catches data at build time.</strong>Even
        through the Unsplash API alwasy return random new image. we can see the
        same image after the refreshing page until we comapail our peoject again
      </Alert>
      <Image
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

export default Page;

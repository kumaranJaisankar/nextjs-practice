import { UnsplashModel } from "@/models/unsplash-model";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstarp";
import { Metadata } from "next";

interface PageProps {
  params: { topic: string };
}
interface ImgError {
  errors: [];
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - Nextjs 13.4 Image gallery",
  };
}

// export const dynamicParams=false;

export function generateStaticParams() {
  return ["health", "coading", "sports"].map((topic) => ({ topic }));
}

const Topics = async ({ params: { topic } }: PageProps) => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPALSH_ACCESS_KEY}`
  );
  const data = await response.json();
  if (Array.isArray(data)) {
    const images: UnsplashModel[] = data;
    return (
      <div className="p-3">
        <Alert>
          This page uses <strong>generateStaticParams</strong> to render and
          cache at bulid time, even through the url as dynamic parameter. Pages
          are not include in generateStaticParams will be render & fetched on
          first access and then
          <strong>catched Subsequent requests</strong>(this can be disabaled )
        </Alert>
        <h1 className="text-primary">{topic}</h1>
        <ul className={`d-flex flex-wrap ${styles.unorderList}`}>
          {images.map((img) => (
            <li key={img.urls.raw}>
              <Image
                placeholder="empty"
                priority={true}
                src={img.urls.raw}
                alt={img.urls.raw}
                width={250}
                height={250}
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <h1>
        this <strong>{topic}</strong> images not found
      </h1>
    );
  }
  //   console.log(images);
};

export default Topics;

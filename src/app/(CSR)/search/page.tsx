// "use client";

import { Metadata } from "next";
import React from "react";
import SearchPage from "./SearchPage";

export const metadata: Metadata = {
  title: "Search - Nextjs 13.4 Image gallery",
};

const Page = () => {
  return <SearchPage />;
};

export default Page;

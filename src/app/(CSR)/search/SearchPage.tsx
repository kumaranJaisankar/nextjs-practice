"use client";

import { UnsplashModel } from "@/models/unsplash-model";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<UnsplashModel[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashModel[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }
  return (
    <div className="p-3">
      <Alert>
        This page fetches data <strong>client side </strong>. in order to not
        leak API credentials, the request is sent to Nextjs{" "}
        <strong>route handler</strong>
        thats runs on the server side.this route handler then fetches the data
        from the Unsplash API and returns it to the client{" "}
      </Alert>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="m-3" controlId="search-input">
            <Form.Label>Search Query</Form.Label>
            <Form.Control name="query" placeholder="Eg: cat, food etc.." />
          </Form.Group>
          <Button type="submit" disabled={searchResultsLoading}>
            search
          </Button>
        </Form>
      </div>
      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsLoadingIsError && (
          <p>Something went wrogn. plz try again</p>
        )}
        {searchResults?.length === 0 && (
          <p>Nothing Found, Try different query!</p>
        )}
      </div>
      <ul className="d-flex flex-wrap list-unstyled">
        {searchResults &&
          searchResults.map((img) => (
            <li key={img.urls.raw}>
              <Image
                src={img.urls.raw}
                alt={img.description}
                width={250}
                height={250}
                className="object-fit-cover m-2 rounded shadow-lg"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchPage;

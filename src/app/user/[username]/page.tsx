import { Alert } from "@/components/bootstarp";
import { UserModel } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface userProps {
  params: { username: string };
}

async function getData(username: string): Promise<UserModel> {
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPALSH_ACCESS_KEY}`
  );
  if (!response.ok) notFound();
  return await response.json();
}

export async function generateMetadata({
  params: { username },
}: userProps): Promise<Metadata> {
  const user = await getData(username);
  return {
    title: user.username + "-  Next js 13.4 Image gallery",
  };
}

const UserName = async ({ params: { username } }: userProps) => {
  const user = await getData(username);
  return (
    <div className="p-3">
      <Alert>
        Thsi profile page <strong>generateMetadata</strong> dynamicaly set the
        page title when fetch the data from API.
      </Alert>
      <h1>userName:{user.username}</h1>
      <p>first name: {user.first_name}</p>
      <p>last_name: {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username} target="_blank">
        {user.username}
      </a>
    </div>
  );
};

export default UserName;

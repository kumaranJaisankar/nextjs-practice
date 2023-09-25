"use client";
import { Button } from "react-bootstrap";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorPageProps) => {
  return (
    <div>
      <h1>Cant use event handel in Server side rendering</h1>
      <Button onClick={reset}> Relode</Button>
    </div>
  );
};

export default Error;

import { Spinner } from "@/components/bootstarp";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Spinner color="black" animation="border" className="d-block m-auto" />
    </div>
  );
};

export default Loading;

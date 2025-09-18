import React from "react";
import { ContentWrapper } from "./content-wrapper";
import { Spinner } from "./ui/shadcn-io/spinner";

export default function Loader({ size = "3rem" }: { size?: number | string }) {
  return (
    <ContentWrapper className="grow flex justify-center items-center">
      <Spinner variant="bars" size={size} />
    </ContentWrapper>
  );
}

import { InformationCircleIcon } from "@heroicons/react/solid";
import React from "react";

interface DescriptionProps {
  text: string,
}
export const Description = ({text}: DescriptionProps): JSX.Element => {
  return(
    <small className="inline italic text-gray-500">{text}</small>
  );
}
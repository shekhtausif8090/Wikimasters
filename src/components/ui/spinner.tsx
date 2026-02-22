import React from "react";
import { Loader } from "lucide-react";

interface Props {
  color?: string;
  size?: string;
}

const Spinner = ({ color, size }: Props) => {
  return (
    <div className="block w-min h-min opacity-60 animate-spin">
      <Loader color={color} size={size} className="block max-w-revert" />
    </div>
  );
};

export default Spinner;

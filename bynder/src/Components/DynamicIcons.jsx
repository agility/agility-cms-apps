import React from "react";
import * as SolidIcons from "@heroicons/react/solid";
import * as OutlineIcons from "@heroicons/react/outline";

export const DynamicIcons = ({
  icon,
  className = "w-6 h-6 text-gray-600",
  outline,
}) => {
  if (!icon) return null;
  const Icon = outline ? OutlineIcons[icon] : SolidIcons[icon];
  return Icon ? <Icon className={className} /> : null;
};

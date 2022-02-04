---
to: src/components/<%= h.capitalize(name) %>/<%= h.capitalize(name) %>.tsx
---
import React from "react";

interface <%= h.capitalize(name) %>Props {
}

export const <%= h.capitalize(name) %> = ({}: <%= h.capitalize(name) %>Props): JSX.Element => {
  return(
    <div><%= h.capitalize(name) %> component</div>
  );
}
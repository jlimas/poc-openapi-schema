"use client";

import { useState } from "react";

import DescriptionEditor from "./DescriptionEditor";
import JsonToSchema from "./JsonToSchema";

function Handler() {
  const [schema, setSchema] = useState(null);

  function output(json) {
    setSchema(json);
  }

  if (!schema) return <JsonToSchema output={output} />;

  return <DescriptionEditor data={schema} />;
}

export default Handler;

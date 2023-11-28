"use client";

import { useState } from "react";

function JsonToSchema({ output }) {
  const [json, setJson] = useState("");

  function convertJsonSchema(json) {
    fetch("https://json-openapi.limas.dev", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((schema) => {
        output && output(schema);
      });
  }

  function onClick() {
    convertJsonSchema(json);
  }

  return (
    <div className="flex flex-col p-5 h-screen">
      <label htmlFor="json">JSON Payload</label>
      <textarea
        name="json"
        id="json"
        className="resize rounded-xl border-2 h-full"
        onChange={(e) => setJson(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 my-4"
        onClick={onClick}
      >
        Convert to Schema
      </button>
    </div>
  );
}

export default JsonToSchema;

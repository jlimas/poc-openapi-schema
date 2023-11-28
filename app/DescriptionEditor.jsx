"use client";

import React, { useState } from "react";

function DescriptionEditor({ data }) {
  const [state, setState] = useState(data);

  const getObjectPath = (str) => {
    return str.split(".").slice(0, -1);
  };

  const handleChange = (path, e) => {
    let newState = { ...state };
    let schema = newState;
    const paths = getObjectPath(path);

    for (const part of paths) {
      if (typeof schema[part] !== "undefined") {
        schema = schema[part];
      }
    }

    schema["description"] = e.target.value;
    setState(newState);
  };

  const renderFields = (data, path = "") => {
    return Object.entries(data).map(([key, value]) => {
      const newPath = path ? `${path}.${key}` : key;
      const label = newPath
        .replaceAll(/properties\.?/g, "")
        .replaceAll(/description\.?/g, "")
        .replaceAll(/\.?$/g, "");

      if (key === "description") {
        return (
          <div className="flex flex-col p-5" key={newPath}>
            <label>{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(newPath, e)}
              className="border-2 border-black"
            />
          </div>
        );
      }

      if (value && typeof value === "object") {
        return renderFields(value, newPath);
      }

      return null;
    });
  };

  return (
    <div className="h-screen flex divide-x-2">
      <div className="grow">{renderFields(state)}</div>
      <div className="grow p-5">
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
}

export default DescriptionEditor;

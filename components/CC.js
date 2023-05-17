"use client";
import React, { useState } from "react";

export default function CC({ component }) {
  
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <form className={component.className} onSubmit={handleSubmit}>
      {component.fields.map((field) => (
        <div key={field.name}>
          <label>
            {field.label}: {" "}
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleInputChange}
              className="border border-blue-400"
            />
          </label>
        </div>
      ))}
      <button type="submit" className="bg-blue-700 text-white mt-2 mb-1 px-2 py-1 text-sm">{component.submitButton.text}</button>
    </form>
  );
}

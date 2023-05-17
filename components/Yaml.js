"use client";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Radio from "./Radio";
import CC from "./CC";
//import MonacoEditor from "react-monaco-editor/lib/editor";
import yaml from "js-yaml";
const MonacoEditor = dynamic(
	() => import("react-monaco-editor/lib/editor"),
	{ ssr: false }
);

export default function Yaml({comp}) {
  const [component, setComponent] = useState(null);
  const [yamldata, setYamldata] = useState(null);
  const [selectedValue, setSelectedValue] = useState(comp);
  const [editMode, setEditMode] = useState(false);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    const getUsers = async () => {
      const url =
        selectedValue === "component1"
          ? "/api/user"
          : "/api/cc";
      const res = await fetch(url);
      const data = await res.json();
      const jsondata = yaml.load(data.yamldata, "utf8").component;

      setComponent(jsondata);
      setYamldata(data.yamldata);
    };

    getUsers(); // run it, run it
  }, [selectedValue]);

  useEffect(() => {
    try {
      const data = yaml.load(yamldata, "utf8").component;

      setComponent(data);
    } catch (ex) {
      console.log("error:", ex);
    }
  }, [yamldata]);

  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: false,
  };
  const editorDidMount = (editor, monaco) => {
    editor.focus();
  };
  const onChange = (newValue, e) => {
    setYamldata(newValue);
  };
  const SaveData = () => {
    const data = yaml.load(yamldata, "utf8").component;
    setComponent(data);
    setEditMode(false);
  };

  const EditData = () => {
    setEditMode(true);
  };

  const Cancel = () => {
    setEditMode(false);
  };
  if (component === null) {
    return (
      <div style={{ float: "left", width: "50%", border: "0px solid maroon" }} className="border border-lime-300 shadow rounded-md p-4 ">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                <div className="h-10 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="h-10 bg-slate-200 rounded col-span-2"></div>
                    <div className="h-10 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                </div>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div style={{ float: "left", width: "70%", border: "0px solid maroon" }}>
      
      <div class="flex mt-4 ml-4 text-sm">
        <label htmlFor="dropdown">Select Component:</label>
        <select
          id="dropdown"
          value={selectedValue}
          onChange={handleSelectChange}
          className="border-2 border-blue-400 ml-2"
        >
          
          <option value="component1">Greet </option>
          <option value="component2">Credit Card </option>
        </select>
      </div>

      <div class="  mt-4 ml-4">
        <div className="w-11/12">
          {component !== null && (
            <div className=" border border-lime-300 p-4">
              <h3 className="underline decoration-sky-500 pb-4 font-bold">{selectedValue === "component1" ? "Greet Component" : "Credit Card Component"}</h3>
              {component.type === "form" ? (
                <CC component={component} />
              ) : (
                <Radio component={component} />
              )}

            {
              editMode ? "" : <button
                onClick={EditData}
                className="bg-slate-700 text-white mt-2 mb-1 px-2 py-1 text-sm"
              >               
                Edit
              </button>
            }
            </div>
          )}
        </div>
       
        {editMode && (
          <div class="w-11/12 border border-lime-300 p-2">
            <MonacoEditor
              width="98%"
              height="330"
              language="yaml"
              theme="vs-dark"
              value={yamldata}
              options={options}
              onChange={onChange}
              editorDidMount={editorDidMount}
            />
            <button
              onClick={SaveData}
              className="bg-slate-700 text-white mt-2 mb-1 px-2 py-1 text-sm"
            >
              {" "}
              Save
            </button>&nbsp;
            <button
              onClick={Cancel}
              className="bg-slate-700 text-white mt-2 mb-1 px-2 py-1 text-sm"
            >
              {" "}
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

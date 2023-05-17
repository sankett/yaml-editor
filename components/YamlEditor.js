"use client";
import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import yaml from "js-yaml";
import Radio from "./Radio";
import CC from "./CC";

export default function YamlEditor({comp, selectedcomponent}) {
  
  const [selectedComp, setSelectedComp] = useState(selectedcomponent);
  const [text, setText] = useState(comp.yamldata);
  const [component, setComponent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  //const [selectedOption, setSelectedOption] = useState("morning");


 
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
    
    setText(newValue);
    //const data = yaml.load(text, "utf8").component;
    //setComponent(data);
  };
  const SaveData = () => {
   
    const data = yaml.load(comp.yamldata, "utf8").component;
    setComponent(data);
    setEditMode(false)
  };

  const EditData = () => {
    setEditMode(true)
  };
  /*const greetChange = (e) => {
    setSelectedOption(e.target.value);
  };*/

  useEffect(() => {
    console.log("in--",selectedcomponent)
    try{
      console.log("textdata",text)
        const data = yaml.load(text, "utf8").component;
        
        setComponent(data);
    }
    catch(ex){
        console.log("error:", ex)
    }
    
  }, [text]);
 
  

  return (
    
      <div class="flex "> 
        
        <div class="w-1/2 border border-blue-800">
          {component !== null && (
            <div>
              {
                component.type === "form"  ? <CC component={component} /> : <Radio component={component} />
              }
            {selectedComp}
            <button onClick={EditData} className="bg-slate-700 text-white mt-2 mb-1"> Edit</button>
            </div>
          )}
        </div>
        {editMode && <div class="w-1/2 border border-blue-800">
          <MonacoEditor
            width="100%"
            height="300"
            language="yaml"
            theme="vs-dark"
            value={text}
            options={options}
            onChange={onChange}
            editorDidMount={editorDidMount}
          />
          <button onClick={SaveData} className="bg-slate-700 text-white mt-2 mb-1"> Save</button>
        </div>
        }
      </div>
    
  );
}

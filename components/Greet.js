
"use client"
import React, { useState, useEffect } from 'react';
import yaml from "js-yaml";

export default function Greet() {
  const [selectedOption, setSelectedOption] = useState('morning');
  const [component, setComponent] = useState(null)

   
    
  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("http://localhost:3000/api/user");
      const data = await res.json();
      const yaml1 = yaml.load(data.yaml, "utf8").component;
      setComponent(yaml1);
      
    };
  
    getUsers(); // run it, run it
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);
 
  const greetChange = (e) => {    
    setSelectedOption(e.target.value)
  }
  if(component === null){
    return <div>Loading..</div>
  }
  
    
  return (

    <div className={component.className}>
      {Object.entries(component.options).map(([key, { displayName, message }]) => (
        <div key={key}>
          <label>
            <input
              type="radio"
              value={key}
              checked={selectedOption === key}
              onChange={greetChange}
            />
            {displayName}
          </label>
        </div>
      ))}
      <p>{component.options[selectedOption].message}</p>
    </div>
  );
  
}
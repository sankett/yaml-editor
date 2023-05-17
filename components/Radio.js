"use client"
import React, { useState } from 'react';


export default function Radio({component}) {

  
    const [selectedOption, setSelectedOption] = useState('morning');
    //const [component, setComponent] = useState(componentData)

    const radioChange = (e) => {    
        setSelectedOption(e.target.value)
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
                  onChange={radioChange}
                />
                {displayName}
              </label>
            </div>
          ))}
          <p>{component.options[selectedOption].message}</p>
        </div>
      );
      

}
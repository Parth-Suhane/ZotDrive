import { firestore } from "../../firebase";
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import makeAnimated from "react-select/animated";

async function fetchValues(currentUser, inputValue){
    var uid = JSON.stringify(currentUser).split(':')[1]
    uid=uid.substring(1,uid.length-2)

    const q = firestore.collection("files").where("userId", "==", uid);
    var startsw = [], incl = [];
    
    await q.get().then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                var curr =[]
                //console.log(doc.data())
                var d = new Date(doc.data().createdAt.seconds*1000)
                curr['label']=doc.data().name+' ('+d.toDateString().split(' ').slice(1).join(' ')+')'
                curr['value']=doc.data().url
                if(doc.data().name.toLowerCase().startsWith(inputValue.toLowerCase())){                 
                  startsw.push(curr)
                }else if(doc.data().name.toLowerCase().includes(inputValue.toLowerCase())){
                  incl.push(curr)
                }
            })
        }
    )
    //console.log(startsw)
    return startsw.concat(incl)
}


export default function FileSearch(currentUser){
    //var options = fetchValues(currentUser)
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const animatedComponents = makeAnimated();
 
    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };
 
    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
        console.log(value)
        window.open(value.value,"_blank")
    }

    const customStyles = {
      control: base => ({
          ...base,

          width: 418.5,
      }),
    }
    
    
    // load options using API call
    const loadOptions = (inputValue, callback) => {
      return fetchValues(currentUser, inputValue);
    };
  
    return (
      <div className="filesearch">
        <AsyncSelect
          components={animatedComponents}
          cacheOptions
          defaultOptions
          value={selectedValue}
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          onChange={handleChange}
          autosize={false}
          styles={customStyles}
        />
      </div>
    );
}

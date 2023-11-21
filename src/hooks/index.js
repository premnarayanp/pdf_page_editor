import { useState } from "react";
// handle checked input field change
export function usePdfPageInputChecked(initialValue){
  const[checked,setChecked]=useState(initialValue);

  function handleInputChecked(e){
     setChecked(e.target.checked);
  } 
  return{
    checked,
    onChange:handleInputChecked
  };
}

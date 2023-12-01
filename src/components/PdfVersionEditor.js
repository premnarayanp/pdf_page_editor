//import{createRef} from "react";
import{useRef} from "react";
import '../styles/pdfVersionEditor.css';
import {PdfVersionSelected,PdfVersionSelector} from './index'

  function PdfVersionEditor(){
    const inputCheckBoxRef=useRef([]);
    console.log("===================PdfVersionEditor Rendered=====================")
      return(
          <div className="PdfVersionEditor">
            <PdfVersionSelected inputCheckBoxRef={inputCheckBoxRef} />
            <PdfVersionSelector inputCheckBoxRef={inputCheckBoxRef} />
          </div>
         
    )

}
export default PdfVersionEditor

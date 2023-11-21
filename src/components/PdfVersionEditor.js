import{Component,createRef} from "react";
import '../styles/pdfVersionEditor.css';
import {PdfVersionSelected,PdfVersionSelector} from './index'
//import { StoreContext } from '../index';

  class PdfVersionEditor  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
    this.inputCheckBoxRef=createRef();
    this.inputCheckBoxRef.current=[];
  }


  render(){
    console.log("===================PdfVersionEditor Rendered=====================")
      return(
          <div className="PdfVersionEditor">
            <PdfVersionSelected inputCheckBoxRef={this.inputCheckBoxRef} />
            <PdfVersionSelector inputCheckBoxRef={this.inputCheckBoxRef} />
          </div>
         
    )
  }
}
export default PdfVersionEditor

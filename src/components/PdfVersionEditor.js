import{Component} from "react";
import '../styles/pdfVersionEditor.css';
import {PdfVersionSelected,PdfVersionSelector} from './index'
//import { StoreContext } from '../index';

  class PdfVersionEditor  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }


  render(){
    console.log("===================PdfVersionEditor Rendered=====================")
      return(
          <div className="PdfVersionEditor">
            <PdfVersionSelected  />
            <PdfVersionSelector  />
          </div>
         
    )
  }
}
export default PdfVersionEditor

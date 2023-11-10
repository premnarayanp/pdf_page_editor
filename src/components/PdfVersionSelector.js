import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionSelector.css';
import {SelectorPage} from './index'
// import { PDFDocument } from "pdf-lib";

  class PdfVersionSelector  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  render(){

    const pdfPageList=this.props.pdfPageList;

     console.log("========page========",pdfPageList );
      return(
          <div className="PdfVersionSelector">
          {
            pdfPageList.map((pdfPage,index) => (
                   <SelectorPage 
                     key={`SelectorPage-${index}`}
                     pageNumber={index+1}
                     pdfPage={pdfPage}
                     store={this.props.store}
                   />
              ))
          }
           
          </div>

    )
  }
}


class PdfVersionSelectorWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <PdfVersionSelector store={store} pdfVersion={this.props.pdfVersion}  pdfPageList={this.props.pdfPageList}/>}
      </StoreContext.Consumer>
    );
  }
}
export default PdfVersionSelectorWrapper;
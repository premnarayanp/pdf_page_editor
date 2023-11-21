import{Component} from "react";
import '../styles/pdfVersionSelector.css';
import {SelectorPage} from './index'
import { connect } from 'react-redux';
//import { StoreContext } from '../index';
//import { connect } from "../index";
// import { PDFDocument } from "pdf-lib";

  class PdfVersionSelector  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
    
  }


  render(){
    console.log("===================PdfVersionSelector Rendered=====================")
    const pdfPageList=this.props.pdfPageList;
    const inputCheckBoxRef=this.props.inputCheckBoxRef;
      return(
          <div className="PdfVersionSelector">
          {
            pdfPageList.map((pdfPage,index) =>{
              var callbackRef=node=>inputCheckBoxRef.current[index]=node;
              return  <SelectorPage 
                     key={`SelectorPage-${index}`}
                     pageNumber={index+1}
                     pdfPage={pdfPage}
                     dispatch={this.props.dispatch}
                     callbackRef={callbackRef}
                   />
            })
          }
        </div>
        
    )
  }
}


//===============way-1 PdfVersionSelectorWrapper to get store/state===================
// class PdfVersionSelectorWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <PdfVersionSelector store={store}  pdfPageList={this.props.pdfPageList} inputCheckBoxRef={this.props.inputCheckBoxRef}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }
// export default PdfVersionSelectorWrapper;

//====================way-2 connect() to get/subscribe store/state================
function mapStateToProps(state){
  const pdfVersion=state.pdfVersion;
  return{
    pdfPageList:pdfVersion.pdfPageList,
  }
}
const connectedPdfVersionSelectorComponent=connect(mapStateToProps)(PdfVersionSelector);
export default connectedPdfVersionSelectorComponent;


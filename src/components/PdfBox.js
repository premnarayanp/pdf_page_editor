import{Component} from "react";
import { PdfUploader,Pdf } from "./index";
import '../styles/pdfBox.css'
import  {showSelectedPdf} from '../actions/pdfActionCreator'
import { connect } from 'react-redux';
//import { connect } from '../index';
//import { StoreContext } from '../index';

//left sidebar
  class PdfBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPdfFile :'',
    };
  }

  handlePdfSelect =(e)=>{
    this.setState({selectedPdfFile:e.target.files[0]})
    this.props.dispatch(showSelectedPdf(true));
    //this.props.store.dispatch(showSelectedPdf(true));
  }

  render(){
    console.log("========================PdfBox Rendered=====================")
     const {isShowSelectedPdf,pdfList}=this.props.pdf;
     
    return(
        <div className="PdfBox">
             <div className="pdfBoxHeader">
               <span>My Pdf </span>

               <div className="pdfInputSelector">
                 <label for="selectMediaInput">
                   <div><span>+</span></div>
                 </label>
                 <input id="selectMediaInput" className="mediaBtn" type="file"   
                    onChange={(e)=>this.handlePdfSelect(e)}
                 />
                </div>
            </div>

            <div className="pdfBoxMain">
              {pdfList.map((pdfFile,index) => (
                   <Pdf 
                     pdfFile={pdfFile} dispatch={this.props.dispatch}
                     key={`pdfFile-${index}`}
                   />
              ))}

              {pdfList.length===0 &&
                    <h1>Nothing PDF Please upload..</h1> 
              }

              {isShowSelectedPdf &&
                     <PdfUploader  dispatch={this.props.dispatch} selectedPdfFile={this.state.selectedPdfFile}/>
              }
            </div>
           
        </div>
    )
  }
}

//===============way-1 PdfBoxWrapper to get store/state===================
// class PdfBoxWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <PdfBox store={store} pdf={this.props.pdf} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
//export default PdfBoxWrapper;

//====================way-2 connect() to get/subscribe store/state================
function mapStateToProps(state){
  return{
   pdf:state.pdf
  }
}
const connectedPdfBoxComponent=connect(mapStateToProps)(PdfBox);
export default connectedPdfBoxComponent;
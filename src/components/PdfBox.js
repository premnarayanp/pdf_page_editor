import{Component} from "react";
import { StoreContext } from '../index';
import { PdfUploader,Pdf } from "./index";
import '../styles/pdfBox.css'
import  {showSelectedPdf} from '../actions/pdfActionCreator'

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
    this.props.store.dispatch(showSelectedPdf(true));
  }

  render(){
    //console.log("===========pdf===============",this.props)
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
                     pdfFile={pdfFile} store={this.props.store}
                     key={`pdfFile-${index}`}
                   />
              ))}

              {pdfList.length===0 &&
                    <h1>Nothing PDF Please upload..</h1> 
              }

              {isShowSelectedPdf &&
                     <PdfUploader selectedPdfFile={this.state.selectedPdfFile}/>
              }
            </div>


           
        </div>
    )
  }
}


class PdfBoxWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <PdfBox store={store} pdf={this.props.pdf} />}
      </StoreContext.Consumer>
    );
  }
}
export default PdfBoxWrapper;
import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionBox.css';
import {PdfVersionList,PdfVersionEditor} from './index'

//right sidebar
  class PdfVersionBox  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }


  render(){
    const {isShowPdfVersionEditor, pdfVersionList,pdfPageList,pdfVersion}=this.props.pdfVersion;
    // console.log("========isShowPdfVersionEditor=======",isShowPdfVersionEditor);
    return(
          <div className="PdfVersionBox">
            <header className="pdfVersionBoxHeader">
              <div className='roundedImageContainer'>
              <img src={require('../assets/pdf_thumbnail_2.png')} alt="pdf-pic" />
              </div>

              <span className="pdfName">pdf name here</span>
              <span className="pdfName">Total pdf version: 0</span>
              <button className="description" onClick={()=>this.handleDescriptionClick()}>
                 Description...
              </button>
            </header>

            {isShowPdfVersionEditor?
                     <PdfVersionEditor pdfPageList={pdfPageList} pdfVersion={pdfVersion}/>
                    :<PdfVersionList pdfVersionList={pdfVersionList} />
              }
            
          </div>

    )
  } 
}


class PdfVersionBoxWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <PdfVersionBox store={store} pdfVersion={this.props.pdfVersion} />}
      </StoreContext.Consumer>
    );
  }
}
export default PdfVersionBoxWrapper;
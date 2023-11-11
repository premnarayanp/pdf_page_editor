import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionBox.css';
import {loadPdf} from '../api/axios';
import {createNewPdf} from '../api/index';
import {PdfVersionList,PdfVersionEditor} from './index'

import { PDFDocument } from "pdf-lib";
import {addPdfVersionToList,showPdfVersionEditor,addPdfVersion,addPdfPageList} from '../actions/pdfVersionActionCreator'

//right sidebar
  class PdfVersionBox  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  createNewPdfVersion=async ()=>{
    const pdfDetail=this.props.pdfVersion.pdfDetail;
    const response= await loadPdf(pdfDetail._id);
    if(response.success){

          const pdfDoc= await PDFDocument.load(response.data);
          const pdfPageList= await pdfDoc.getPages();

         this.props.store.dispatch(addPdfPageList(pdfPageList));
         this.props.store.dispatch(addPdfVersion({pageList:[],pdf_id:pdfDetail._id}));
         this.props.store.dispatch(showPdfVersionEditor(true));
    }
  }

  closeEditor=()=>{
    this.props.store.dispatch(showPdfVersionEditor(false));
  }

//create new pdf version on server /create new pdf
   finalCreateNewPdfVersion =async()=>{
    const pdfVersion=this.props.pdfVersion.pdfVersion;

    const response= await createNewPdf({pageList:pdfVersion.pageList},pdfVersion.pdf_id);
    if(response.success){
     // console.log("===================pdfVersion==============",response.data)
      this.props.store.dispatch(addPdfVersionToList(response.data));
      this.props.store.dispatch(showPdfVersionEditor(false));
    }
  }


  render(){
    //console.log("========pdfDetail=======",pdfDetail);
    const {isShowPdfVersionEditor, pdfVersionList,pdfPageList,pdfVersion,pdfDetail}=this.props.pdfVersion;

    return(
          <div className="PdfVersionBox">
            <header className="pdfVersionBoxHeader">
              <div className='roundedImageContainer'>
              <img src={require('../assets/pdf_thumbnail_2.png')} alt="pdf-pic" />
              </div>

              <span className="pdfName">Name:- {pdfDetail && pdfDetail.originalname}</span>
              <span className="pdfName">Total Version:- {pdfVersionList && pdfVersionList.length}</span>
              {
                isShowPdfVersionEditor? 
                <div>
                   <button className="closeBtn" onClick={()=>this.closeEditor()}>Close</button>
                   <button className="final_doneBtn" onClick={()=>this.finalCreateNewPdfVersion(pdfVersion)} >Done</button>
                </div>
                :<button className="createNewBtn" onClick={()=>this.createNewPdfVersion()}>Create New</button>
              }
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
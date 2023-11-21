import{Component} from "react";
import {loadPdf} from '../api/axios';
import {createNewPdf} from '../api/index';
import {PdfVersionList,PdfVersionEditor} from './index'

import { PDFDocument } from "pdf-lib";
import {addPdfVersionToList,showPdfVersionEditor,addPdfVersion,addPdfPageList} from '../actions/pdfVersionActionCreator'
import '../styles/pdfVersionBox.css';
import { connect } from 'react-redux';
//import { connect } from "../index";
//import { StoreContext } from '../index';

//right sidebar
class PdfVersionBox  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  createNewPdfVersion=async ()=>{
    const {currentPdfVersion,pdfDetail}=this.props;
    //const {pdfPageList,pdfDetail}=this.props.pdfVersion;

    //same pdf load  from server only one time
    //if pdfPageList already then don,t  need to load again and ain for same pdf
    //But When i want to work on another pdf so when i click version (in Pdf component) to show all version of my current pdf on that time i set pdf pdfPageList=[] so length will we 0 so i load it, 
    //pdfPageList=[] represent you need to load pdf because you are working on new pdf which not loaded, but length>0 mens i want create new version of same pdf which already loaded
    
    if(!currentPdfVersion){
      const response= await loadPdf(pdfDetail._id);
      if(response.success){
          const pdfDoc= await PDFDocument.load(response.data);
          const pdfPageList= await pdfDoc.getPages();

         this.props.dispatch(addPdfPageList(pdfPageList));
         this.props.dispatch(addPdfVersion({pageList:[],pdf_id:pdfDetail._id}));
         this.props.dispatch(showPdfVersionEditor(true));
      }
    }else{
      //if already  pdfPageList then just open editor and update pdfVersion pageList=[],
         this.props.dispatch(addPdfVersion({pageList:[],pdf_id:pdfDetail._id}));
         this.props.dispatch(showPdfVersionEditor(true));
    }
  }

  closeEditor=()=>{
    this.props.dispatch(showPdfVersionEditor(false));
  }

//create new pdf version on server /create new pdf
   finalCreateNewPdfVersion =async()=>{
    const currentPdfVersion=this.props.currentPdfVersion;

    const response= await createNewPdf({pageList:currentPdfVersion.pageList},currentPdfVersion.pdf_id);
    if(response.success){
     // console.log("===================pdfVersion==============",response.data)
      this.props.dispatch(addPdfVersionToList(response.data));
      this.props.dispatch(showPdfVersionEditor(false));
    }
  }


  render(){
    console.log("==================PdfVersionBox Rendered=====================")
    const {isShowPdfVersionEditor,currentPdfVersion,pdfDetail,pdfVersionList}=this.props;

    return(
          <div className="PdfVersionBox">
            {
              pdfDetail &&
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
                   <button className="final_doneBtn" onClick={()=>this.finalCreateNewPdfVersion(currentPdfVersion)} >Done</button>
                </div>
                :<button className="createNewBtn" onClick={()=>this.createNewPdfVersion()}>Create New</button>
              }
            </header>
            }

            {isShowPdfVersionEditor?
                     <PdfVersionEditor/>
                    :<PdfVersionList  dispatch={this.props.dispatch} pdfVersionList={pdfVersionList} />
              }
            
          </div>

    )
  } 
}

//===============way-1 PdfVersionBoxWrapper to get store/state===================
// class PdfVersionBoxWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer> 
//         {(store) => <PdfVersionBox store={store} pdfVersion={this.props.pdfVersion} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
// export default PdfVersionBoxWrapper;

//====================way-2 connect() to get/subscribe store/state================
function mapStateToProps(state){
  const pdfVersion=state.pdfVersion;
  return{
    currentPdfVersion:pdfVersion.currentPdfVersion,
    pdfDetail:pdfVersion.pdfDetail,
    isShowPdfVersionEditor:pdfVersion.isShowPdfVersionEditor,
    pdfVersionList:pdfVersion.pdfVersionList,
  }
}
const connectedPdfVersionBoxComponent=connect(mapStateToProps)(PdfVersionBox);
export default connectedPdfVersionBoxComponent;
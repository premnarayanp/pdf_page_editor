import{Component} from "react"
import '../styles/pdf.css';
import {deletePdfToList} from '../actions/pdfActionCreator'
import {loadPdf,downloadPdf} from '../api/axios';
import {deletePdf,getPdfVersionPosts} from '../api/index';
import {showPdfVersionEditor,addPdfVersionList,addPdfDetail,addPdfVersion,deleteAllPdfVersionData,pdfPageListLoaded,add_UpdateEditMode} from '../actions/pdfVersionActionCreator'
//import { StoreContext } from '../index';

 class Pdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      };
  }

  downloadPdfFile= async()=>{
    const response= await downloadPdf(this.props.pdfFile._id);
    if(response.success){
        //Build a URL from the file
        var file = new Blob([response.data], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        const link=document.createElement('a');
        link.href=fileURL;
        link.download="MyPdf.pdf"
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }
  }

  openPdfFile=async()=>{
    const response= await loadPdf(this.props.pdfFile._id);
    if(response.success){
         //Build a URL from the file
         var file = new Blob([response.data], {type: 'application/pdf'});
         const fileURL = URL.createObjectURL(file);
         window.open(fileURL);
    }
  }


  deletePdfFile=async()=>{
    const response= await deletePdf(this.props.pdfFile._id);
    if(response.success){
      this.props.dispatch(deletePdfToList(response.data.pdf));
      this.props.dispatch(deleteAllPdfVersionData(this.props.pdfFile._id));

      // this.props.dispatch(addPdfDetail(null));
      // this.props.dispatch(addPdfVersionList([]));

    }
  }

  openVersionList=async()=>{

    const response = await getPdfVersionPosts(this.props.pdfFile._id);
    if(response.success){
      //this.props.dispatch(addPdfPageList([]));//erase previous pdfPageList,and after new pdfPageList will we added when i click "create new "  inside pdfVersionBox in header
      this.props.dispatch(addPdfDetail(this.props.pdfFile));
      this.props.dispatch(addPdfVersionList(response.data.pdfVersionList));
      this.props.dispatch(showPdfVersionEditor(false));
      this.props.dispatch(addPdfVersion(null));
      this.props.dispatch(pdfPageListLoaded(false));
      this.props.dispatch(add_UpdateEditMode(false));
    }else{

    }
  }

  render(){
  const {pdfFile}=this.props;
  console.log("===================Pdf Rendered=====================")
    return(
        <div className="Pdf">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"  onClick={()=>this.openVersionList()}/>
             <div className="pdfTitle">
               <span>{pdfFile.originalname}</span>
             </div>

             <div id="pdfAction">
               <button className="downloadBtn" onClick={()=>this.downloadPdfFile()}> download</button>
               <button className="openBtn" onClick={()=>this.openPdfFile()}> open</button>
               <button className="deleteBtn" onClick={()=>this.deletePdfFile(pdfFile._id)}>delete</button>
               <button className="openBtn" onClick={()=>this.openVersionList()}>Versions</button>
             </div>
        </div>
    )
  }
}
export default Pdf

// export default class PdfWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//            {(store) => <Pdf store={store}  pdfFile={this.props.pdfFile}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }
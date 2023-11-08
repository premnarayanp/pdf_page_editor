import{Component} from "react"
import '../styles/pdf.css';
import { StoreContext } from '../index';
import {deletePdfToList} from '../actions/pdfActionCreator'
import {loadPdf,downloadPdf} from '../api/axios';
import {deletePdf} from '../api/index';

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
      this.props.store.dispatch(deletePdfToList(response.data.pdf));
    }
  }

  render(){
  const {pdfFile}=this.props;
    return(
        <div className="Pdf">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
             <div className="pdfTitle">
               <span>{pdfFile.originalname}</span>
             </div>

             <div id="pdfAction">
               <button className="downloadBtn" onClick={()=>this.downloadPdfFile()}> download</button>
               <button className="openBtn" onClick={()=>this.openPdfFile()}> open</button>
               <button className="deleteBtn" onClick={()=>this.deletePdfFile(pdfFile._id)}>delete</button>
             </div>
        </div>
    )
  }
}

export default class PdfWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
           {(store) => <Pdf store={store}  pdfFile={this.props.pdfFile}/>}
      </StoreContext.Consumer>
    );
  }
}
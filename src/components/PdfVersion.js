
//import { useToasts } from 'react-toast-notifications';
import  '../styles/pdfVersion.css';

const PdfVersion = (props) => {
const pdfVersion=props.pdfVersion;
console.log("=====pppppppppppppppppppp==========",pdfVersion)
  return (
    <div className="PdfVersion">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
             <div className="pdfTitle">
               <span>{pdfVersion.name}</span>
             </div>

             <div id="pdfAction">
               <button className="downloadBtn" onClick={()=>this.downloadPdfFile()}> download</button>
               <button className="openBtn" onClick={()=>this.openPdfFile()}> open</button>
               <button className="deleteBtn" onClick={()=>this.deletePdfFile(pdfVersion._id)}>delete</button>
               <button className="createNewBtn" onClick={()=>this.createNewPdfVersion(pdfVersion._id)}>Create New</button>
             </div>
        </div>
  );
};

export default PdfVersion;

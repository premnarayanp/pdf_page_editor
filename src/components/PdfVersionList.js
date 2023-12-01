import '../styles/pdfVersionList.css';
import {PdfVersion} from './index'

function PdfVersionList(props) {
  const {pdfVersionList,isPdfPageListLoaded,dispatch}=props;
  console.log("===================PdfVersionList Rendered=====================")
    return(
        <div className="PdfVersionList">
            
            {pdfVersionList.map((pdfVersion,index) => (
                   <PdfVersion 
                     pdfVersion={pdfVersion}
                     dispatch={dispatch}
                     isPdfPageListLoaded={isPdfPageListLoaded}
                     key={`pdfVersion-${index}`}
                   />
              ))}

              {pdfVersionList.length===0 &&
                    <span className="nothingPdf">No pdfVersion Please create new Or Open Another PDf</span> 
              }
        </div>
    )
}

export default PdfVersionList;
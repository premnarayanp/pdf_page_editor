import '../styles/pdfVersionSelected.css';
import {SelectedPage} from './index'
import { connect } from 'react-redux';

  function PdfVersionSelected(props){

    const {pdfPageList,currentPdfVersion,inputCheckBoxRef,dispatch}=props;
    const pageList=currentPdfVersion.pageList
    // console.log("===================PdfVersionSelected Rendered=====================")

     return(
      <div className="PdfVersionSelected">
         {
           pageList.map((pageIndex,index) => (
                 <SelectedPage
                    key={`SelectedPage-${pageIndex}`}
                    pageNumber={pageIndex}
                    pdfPage={pdfPageList[pageIndex-1]}
                    inputCheckBoxRef={inputCheckBoxRef}
                    dispatch={dispatch}
                  />
             ))

         }

         {
          pageList.length===0 && <div>
            <h1> Checked pdf page show here</h1>
          </div>
         }
          
         </div>

   )
}

function mapStateToProps(state){
  const pdfVersion=state.pdfVersion;
  return{
    pdfPageList:pdfVersion.pdfPageList,
    currentPdfVersion:pdfVersion.currentPdfVersion
  }
}
const connectedPdfVersionSelectedComponent=connect(mapStateToProps)(PdfVersionSelected);
export default connectedPdfVersionSelectedComponent;



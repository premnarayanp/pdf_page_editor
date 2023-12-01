import { useEffect } from 'react';
import '../styles/pdfVersionSelector.css';
import {SelectorPage} from './index'
import { connect } from 'react-redux';

function PdfVersionSelector(props) {
  const {pdfPageList,inputCheckBoxRef,isEditModeOn,editablePageIndexList,dispatch}=props;

  useEffect(()=>{
    //if i want to edit ,so Selector Page checked
    if(isEditModeOn){
      const pageNumberList=editablePageIndexList;
      pageNumberList.forEach(pageNumber => {
         inputCheckBoxRef.current[pageNumber-1].checked=true;
      });
    }
  });

    console.log("===================PdfVersionSelector Rendered=====================")
      return(
          <div className="PdfVersionSelector">
          {
            pdfPageList.map((pdfPage,index) =>{
              var callbackRef=node=>inputCheckBoxRef.current[index]=node;
              return  <SelectorPage 
                     key={`SelectorPage-${index}`}
                     pageNumber={index+1}
                     pdfPage={pdfPage}
                     dispatch={dispatch}
                     callbackRef={callbackRef}
                   />
            })
          }
        </div>
        
    )
}

function mapStateToProps(state){
  const pdfVersion=state.pdfVersion;
  return{
    pdfPageList:pdfVersion.pdfPageList,
    editablePageIndexList:pdfVersion.editablePageIndexList,
    isEditModeOn:pdfVersion.isEditModeOn,
  }
}
const connectedPdfVersionSelectorComponent=connect(mapStateToProps)(PdfVersionSelector);
export default connectedPdfVersionSelectorComponent;


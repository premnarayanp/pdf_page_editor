import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionSelected.css';
import {SelectedPage} from './index'
import {createNewPdf} from '../api/index';
import {addPdfVersionToList,showPdfVersionEditor} from '../actions/pdfVersionActionCreator'

  class PdfVersionSelected  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  //create new pdf version on server /create new pdf
  finalCreateNewPdfVersion =async()=>{
    const pdfVersion=this.props.pdfVersion;
    const response= await createNewPdf({pageList:pdfVersion.pageList},pdfVersion.pdf_id);
    if(response.success){
      console.log("===================pdfVersion==============",response.data)
      this.props.store.dispatch(addPdfVersionToList(response.data));
      this.props.store.dispatch(showPdfVersionEditor(false));
    }
  }

  render(){

      
    const {pdfPageList,pdfVersion}=this.props;
    const pageList=pdfVersion.pageList
    //console.log("========page========",pdfPageList );

     return(
      <div className="PdfVersionSelected">
         {
           pageList.map((pageIndex,index) => (
                 <SelectedPage
                    key={`SelectedPage-${pageIndex}`}
                    pageNumber={pageIndex}
                    pdfPage={pdfPageList[pageIndex]}
                  />
             ))

         }

         {
          pageList.length!==0 && <button className="final_doneBtn" onClick={()=>this.finalCreateNewPdfVersion(pdfVersion)} >Done</button>
         }

         {
          pageList.length===0 && <div>
            <h1> Checked pdf page show here</h1>
          </div>
         }
          
         </div>

   )
 }
}





class PdfVersionSelectedWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <PdfVersionSelected store={store} pdfVersion={this.props.pdfVersion}  pdfPageList={this.props.pdfPageList}/>}
      </StoreContext.Consumer>
    );
  }
}
export default PdfVersionSelectedWrapper;
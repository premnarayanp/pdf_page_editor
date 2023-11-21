import{Component} from "react";
import '../styles/pdfVersionSelected.css';
import {SelectedPage} from './index'
import { connect } from 'react-redux';
//import { connect } from "../index";
//import { StoreContext } from '../index';

  class PdfVersionSelected  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  render(){
    console.log("===================PdfVersionSelected Rendered=====================")
    const {pdfPageList,currentPdfVersion}=this.props;
    const pageList=currentPdfVersion.pageList

     return(
      <div className="PdfVersionSelected">
         {
           pageList.map((pageIndex,index) => (
                 <SelectedPage
                    key={`SelectedPage-${pageIndex}`}
                    pageNumber={pageIndex}
                    pdfPage={pdfPageList[pageIndex]}
                    dispatch={this.props.dispatch}
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
}




//===============way-1 PdfVersionSelectorWrapper to get store/state===================
// class PdfVersionSelectedWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <PdfVersionSelected store={store} pdfVersion={this.props.pdfVersion}  pdfPageList={this.props.pdfPageList} inputCheckBoxRef={this.props.inputCheckBoxRef}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }
// export default PdfVersionSelectedWrapper;

//====================way-2 connect() to get/subscribe store/state================
function mapStateToProps(state){
  const pdfVersion=state.pdfVersion;
  return{
    pdfPageList:pdfVersion.pdfPageList,
    currentPdfVersion:pdfVersion.currentPdfVersion
  }
}
const connectedPdfVersionSelectedComponent=connect(mapStateToProps)(PdfVersionSelected);
export default connectedPdfVersionSelectedComponent;
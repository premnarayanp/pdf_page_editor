import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionSelected.css';
import {SelectedPage} from './index'

  class PdfVersionSelected  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }

  render(){

    console.log("==============inside PdfVersionSelected====================");
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
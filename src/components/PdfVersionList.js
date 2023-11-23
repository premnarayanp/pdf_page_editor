import{Component} from "react";
//import { StoreContext } from '../index';
import '../styles/pdfVersionList.css';
import {PdfVersion} from './index'

  class PdfVersionList  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }


render(){
  console.log("===================PdfVersionList Rendered=====================")
  const {pdfVersionList,isPdfPageListLoaded}=this.props;
    return(
        <div className="PdfVersionList">
            
            {pdfVersionList.map((pdfVersion,index) => (
                   <PdfVersion 
                     pdfVersion={pdfVersion} store={this.props.store}
                     dispatch={this.props.dispatch}
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
}

export default PdfVersionList;

// class PdfVersionListWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <PdfVersionList  pdfVersionList={this.props.pdfVersionList} store={store}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }
// export default PdfVersionListWrapper;
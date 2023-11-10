import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionList.css';
import {PdfVersion} from './index'

  class PdfVersionList  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }


render(){
  const {pdfVersionList}=this.props;
    return(
        <div className="PdfVersionList">
            
            {pdfVersionList.map((pdfVersion,index) => (
                   <PdfVersion 
                     pdfVersion={pdfVersion} store={this.props.store}
                     key={`pdfVersion-${index}`}
                   />
              ))}

              {pdfVersionList.length===0 &&
                    <h1>Nothing pdfVersion Please create new..</h1> 
              }
        </div>
    )
  }
}


class PdfVersionListWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <PdfVersionList  pdfVersionList={this.props.pdfVersionList} store={store}/>}
      </StoreContext.Consumer>
    );
  }
}
export default PdfVersionListWrapper;
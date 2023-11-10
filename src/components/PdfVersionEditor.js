import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionEditor.css';
import {PdfVersionSelected,PdfVersionSelector} from './index'

  class PdfVersionEditor  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }


  render(){

    const {pdfPageList,pdfVersion}=this.props;

      return(
          <div className="PdfVersionEditor">
            <PdfVersionSelected pdfPageList={pdfPageList} pdfVersion={pdfVersion}/>
            <PdfVersionSelector pdfPageList={pdfPageList} pdfVersion={pdfVersion}/>
          </div>

    )
  }
}


class PdfVersionEditorWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <PdfVersionEditor store={store} 
         pdfPageList={this.props.pdfPageList}
         pdfVersion={this.props.pdfVersion}
        />}
      </StoreContext.Consumer>
    );
  }
}
export default PdfVersionEditorWrapper;
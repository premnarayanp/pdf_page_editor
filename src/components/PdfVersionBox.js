import{Component} from "react";
import { StoreContext } from '../index';
import '../styles/pdfVersionBox.css';
//right sidebar
  class PdfVersionBox  extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }


  render(){
      return(
          <div className="PdfVersionBox">
            <header className="pdfVersionBoxHeader">
              <div className='roundedImageContainer'>
              <img src={require('../assets/pdf_thumbnail_2.png')} alt="pdf-pic" />
              </div>

              <span className="pdfName">pdf name here</span>
              <span className="pdfName">Total pdf version: 0</span>
              <button className="description" onClick={()=>this.handleDescriptionClick()}>
                 Description...
              </button>
            </header>
  
            <main className="pdfVersionBoxMain">

            </main>
          </div>

    )
  }
}


class PdfVersionBoxWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <PdfVersionBox store={store}/>}
      </StoreContext.Consumer>
    );
  }
}
export default PdfVersionBoxWrapper;
import{Component} from "react"
import '../styles/pdf.css';
import { StoreContext } from '../index';
 
 class Pdf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      };
  }

  render(){
  const {pdfFile}=this.props;
    return(
        <div className="Pdf">
             <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
             <div className="pdfTitle">
               <span>{pdfFile.originalname}</span>
             </div>

             <div id="pdfAction">
             </div>
        </div>
    )
  }
}

export default class PdfWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
           {(store) => <Pdf store={store}  pdfFile={this.props.pdfFile}/>}
      </StoreContext.Consumer>
    );
  }
}
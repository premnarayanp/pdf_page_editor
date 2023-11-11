import '../styles/home.css';
import React,{Component} from 'react';
import { getPdfPosts} from '../api/index';
import {addPdfList} from '../actions/pdfActionCreator'
import { StoreContext } from '../index';
import {PdfBox ,PdfVersionBox} from '../components/index';
import {showPdfVersionEditor,addPdfVersionList,addPdfDetail} from '../actions/pdfVersionActionCreator'


class Home extends React.Component{

  async componentDidMount(){
     const {store}=this.props;
     const response=await getPdfPosts();
     if(response.success && response.data.pdfList[0]){
      store.dispatch(addPdfDetail(response.data.pdfList[0]));
      store.dispatch(addPdfList(response.data.pdfList));
      store.dispatch(addPdfVersionList(response.data.pdfList[0].pdfVersionList));

       //console.log("=========response.data.pdfList=========",response.data.pdfList);
     }
  }

   render(){
    const {pdf,pdfVersion}=this.props.store.getState();

    return (
      <div className="Home">
        <PdfBox  pdf={pdf}/>
        <PdfVersionBox pdfVersion={pdfVersion}/>
      </div>
    );
  }

}
 
class HomeWrapper extends Component {
  render() {
    return (
      <StoreContext.Consumer>
        {(store) => <Home store={store} />}
      </StoreContext.Consumer>
    );
  }
}
export default HomeWrapper;
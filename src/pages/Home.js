import '../styles/home.css';
import React from 'react';
import { getPdfPosts} from '../api/index';
import {PdfBox ,PdfVersionBox} from '../components/index';
import {addPdfVersionList,addPdfDetail} from '../actions/pdfVersionActionCreator';
import {addPdfList} from '../actions/pdfActionCreator'
import { connect } from 'react-redux';
//import { connect } from '../index';
//import { StoreContext } from '../index';

class Home extends React.Component{

  async componentDidMount(){
     //const {store}=this.props;
     const {dispatch}=this.props;
     const response=await getPdfPosts();
     if(response.success && response.data.pdfList[0]){
      dispatch(addPdfDetail(response.data.pdfList[0]));
      dispatch(addPdfList(response.data.pdfList));
      dispatch(addPdfVersionList(response.data.pdfList[0].pdfVersionList));
     }
  }

   render(){
    //const {pdf,pdfVersion}=this.props.store.getState();
    //const {pdf,pdfVersion}=this.props
    console.log("========================Home Rendered=====================")
    return (
      <div className="Home">
        <PdfBox/>
        <PdfVersionBox/>
      </div>
    );
  }

}
//export default Home
 
 // class HomeWrapper extends Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <Home store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }
// export default HomeWrapper;

//==============================connect=================================
function mapStateToProps(state){
  return{
  }
}
const connectedHomeComponent=connect(mapStateToProps)(Home);
export default connectedHomeComponent;
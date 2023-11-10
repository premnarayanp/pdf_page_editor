import { useState } from 'react';
//import { useToasts } from 'react-toast-notifications';
import  '../styles/selectedPage.css';

const SelectedPage = (props) => {
  //const [email, setEmail] = useState('');
  //const { addToast } = useToasts();

  return (
    <div className="SelectedPage">
        <div className='pdfOrPageOfPdf'>
        <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
      </div>
      <div className='pageAction'>
        <span> Page Number:{props.pageNumber}</span>
        <button className='removePageBtn'>Cut</button>
      </div>
    </div>
  );
};

export default SelectedPage;

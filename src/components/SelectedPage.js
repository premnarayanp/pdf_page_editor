import  '../styles/selectedPage.css';

const SelectedPage = (props) => {

  async function  handleRemovePage(){
     
  }



  return (
    <div className="SelectedPage">
        <div className='pdfOrPageOfPdf'>
        <img src={require('../assets/pdf_thumbnail_2.png')} alt="PDF_Image"/>
      </div>
      <div className='pageAction'>
        <span> Page Number:{props.pageNumber}</span>
        <button className='removePageBtn' onClick={handleRemovePage}>Cut</button>
      </div>
      {
        console.log("===================SelectedPage Rendered=====================")
      }
    </div>
  );
};

export default SelectedPage;

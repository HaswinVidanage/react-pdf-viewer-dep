import React, { Component } from 'react';
import * as PdfJs from 'pdfjs-dist';

// Components
import { Viewer } from './components/Viewer';

const PDF_URL = './test.pdf';


class PDFViewer extends Component {
  state = {
    pdf: null,
    scale: 1.2
  };

  componentDidMount() {
    PdfJs.getDocument(PDF_URL).then((pdf) => {
      console.log(pdf);
      this.setState({ pdf });
    });
  }

  render() {
    const { pdf, scale } = this.state;
    const { changePageTriggerVal, onCurrentPageChange } = this.props;
  
    // if(changePageTriggerVal &&  pdf){
    //   console.log('changePageTriggerVal', changePageTriggerVal);
    //   PdfJs.currentPageNumber = 5;
    // }
    return (
      <div className="pdf-context">
        <Viewer
          changePageTriggerVal={changePageTriggerVal}
          onCurrentPageChange={onCurrentPageChange}
          pdf={pdf}
          scale={scale}
        />
      </div>
    );
  }
}

export { PDFViewer };

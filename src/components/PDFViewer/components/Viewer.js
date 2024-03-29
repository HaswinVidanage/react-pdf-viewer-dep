import React from 'react';

// Components
import { Page } from './Page';

/**
 * View.js
 * Component that works as a pdf pages "container"
 * - default usage is in ../PDFViewer.js
 **/
const Viewer = ({ pdf, onCurrentPageChange, changePageTriggerVal, ...props }) => {
  const numPages = pdf ? pdf.pdfInfo.numPages : 0;
  
  if (pdf) {
    return (
      <div className="pdf-viewer">
        { Array.apply(null, { length: numPages }).map(
          (v, i) => (
            <Page
              onCurrentPageChange={onCurrentPageChange}
              pdf={pdf}
              index={i + 1}
              numPages={numPages}
              key={`document-page-${i}`}
              {...props}
            />
          )
        )}
      </div>
    );
  }

  return null;
};

export { Viewer };

import React, { Component }  from 'react';

// Components
import { PDFViewer } from './components/PDFViewer';

// Styles
import './assets/css/App.css';

class App extends Component {
  state = {
    currentPageNum: 1,
    gotoPageNumValue: 1,
    changePageTriggerVal: null
  };
  constructor(props) {
    super(props);
    this.onCurrentPageChange = this.onCurrentPageChange.bind(this);
    this.changePageNum = this.changePageNum.bind(this);
  }

  onCurrentPageChange(currentPageNum) {
    this.setState({
      currentPageNum
    });
  }
  
  changePageNum(event) {
    this.setState({ gotoPageNumValue: event.target.value });
  }
  
  changePage() {
    console.log('changePage parent');
    this.setState({
      changePageTriggerVal: this.state.gotoPageNumValue
    });
  }
  
  render() {

    return (
      <div className="App">
        <header className="toc">
          <h1 className="App-title">PDF.JS Example for ReactJS</h1>
          <h2> Current Page: {this.state.currentPageNum}</h2>
          {/*<div>*/}
            {/*<label>Page: </label>*/}
            {/*<input style={{ width: '105px' }} value={this.state.gotoPageNumValue} onChange={this.changePageNum}*/}
            {/*/>*/}
            {/*<button onClick={() => this.changePage()}>Go</button>*/}
          {/*</div>*/}
          
          
        </header>
        <PDFViewer
          onCurrentPageChange={this.onCurrentPageChange}
          changePageTriggerVal={this.state.changePageTriggerVal} />
      </div>
    );
  }
};

export default App;

import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
/**
 * Page.js
 * Component rendering page of PDF
 **/

class Page extends Component {
  state = {
    status: 'N/A',
    page: null,
    width: 0,
    height: 0
  };
  
  constructor(props) {
    super(props);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.pdf !== nextProps.pdf || this.state.status !== nextState.status;
  }

  componentDidUpdate(nextProps) {
    this._update(nextProps.pdf);
  }

  componentDidMount() {
    const { pdf } = this.props;
    this._update(pdf);
  }

  setCanvasRef = (canvas) => {
    this.canvas = canvas;
  };

  _update = (pdf) => {
    if (pdf) {
      this._loadPage(pdf);
    } else {
      this.setState({ status: 'loading' });
    }
  };

  _loadPage(pdf) {
    if (this.state.status === 'rendering' || this.state.page !== null) return;

    pdf.getPage(this.props.index).then(
      (page) => {
        this.setState({ status: 'rendering' });
        this._renderPage(page);
      }
    );
  }

  _renderPage(page) {
    console.log(this.props);
    let { scale } = this.props;
    let viewport = page.getViewport(scale);
    let { width, height } = viewport;
    let canvas = this.canvas;
    let context = canvas.getContext('2d');
    console.log(viewport.height, viewport.width);
    canvas.width = width;
    canvas.height = height;

    page.render({
      canvasContext: context,
      viewport
    });

    this.setState({ status: 'rendered', page, width, height });
  }
  
  onVisibilityChange(isVisible) {
    // console.log(`Page ${this.props.index} is now %s`, isVisible ? 'visible' : 'hidden');
    if (isVisible) {
      this.props.onCurrentPageChange(this.props.index);
      console.log(`Page ${this.props.index} is now visible`);
    }
  };
  render() {
    let { width, height, status } = this.state;
    // const { changePageTriggerVal } = this.props;
    console.log('props:', this.props);
    return (
      <VisibilitySensor
        scrollCheck
        scrollThrottle={100}
        intervalDelay={8000}
        partialVisibility
        onChange={this.onVisibilityChange}>
        <div className={`pdf-page ${status}`} style={{ width, height }} id={this.props.index}>
          <canvas ref={this.setCanvasRef} data-page-number={this.props.index} />
        </div>
      </VisibilitySensor>
    );
  }
}

export { Page };

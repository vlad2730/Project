import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Example </div>

              <div className="card-body">I'm an example component!</div>
              <div>
                <input type="text" value={this.state.firstName}
                  onChange={event => this.setState({firstName: event.target.value})} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Example;

if (document.getElementById('example')) {
  ReactDOM.render(<Example />, document.getElementById('example'));
}

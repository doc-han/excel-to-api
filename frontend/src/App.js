import React, { Component } from "react";
import "./App.css";
import Upload from "./Component/Upload";
import Layout from "./Layout/layout";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      slug: null,
      slugValid: false,
      warning: false
    }
  }

  slugChangeHandler = (e) => {
    let { value } = e.target;
    let isValid = !/[^\w]|\d/gm.test(value);
    this.setState({
      slug: value,
      slugValid: isValid
    });

  }

  uploadClick = () => {
     if (!this.state.slugValid) {
      this.setWarning("Endpoint slug is invalid!");
    } else if (this.state.slug.trim() === "") {
      this.setWarning("Endpoint slug is empty!");
    }else if (!this.state.file) {
      this.setWarning("File not selected!");
    }

    if (!this.state.warning) {
      console.log('upload file...');
    } else {
      setInterval(()=> this.setWarning(false),5000);
    }
  }

  setWarning = _w => this.setState({warning: _w});

  onChangeHandler = event => {
    this.setState({
      file: event.target.files[0]
    })
  }

  render() {
    let { slugValid, warning } = this.state;
    return (
      <div className="App">
        {/* <h1>XLS TO API</h1> */}
        {/* <button className="button is-primary">Upload</button> */}
        <Layout>
          <section className="section">
            <div style={{ display: warning ? 'block' : 'none' }} className="notification is-warning">
              <label style={{fontWeight: 600}}>{ warning }</label>
            </div>
            <div class="field">
              <label class="label">Endpoint</label>
              <div class="control">
                <input name="slug" onChange={this.slugChangeHandler} className={`input is-large ${slugValid ? 'is-outlined is-success' : 'is-outlined is-danger'}`} type="text" placeholder="Endpoint" />
              </div>
            </div>
            <div class="field">
              <label class="label">XLS file</label>
              <div class="control">
                <input name="xlsfile" class="input is-large" type="file" onChange={this.onChangeHandler} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={this.uploadClick} className="button is-dark is-large">Upload</button>
            </div>
          </section>
        </Layout>
      </div>
    );
  }
}

export default App;

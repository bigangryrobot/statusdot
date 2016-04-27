PublicBanner = React.createClass({
  render() {
    return <div className="header-image">
        <div className="headline">
            <div className="container">
                <h1>HordBoard</h1>
                <h3>Application life cycle management made easy</h3>
            </div>
            <div className="container">
                <div className="header-search-container">
                  <div className="input-group">
                    <input className="form-control input" type="text" id="inputLarge" placeholder="find components"/>
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button">Submit</button>
                    </span>
                  </div>            
                </div>
            </div>            
        </div>
    </div>;
  }
});


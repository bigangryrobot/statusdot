Button = React.createClass({
  render() {
    if ( this.props.href ) {
      return <a href={ this.props.href } className={ `btn btn-${ this.props.style } ${ this.props.additionalclass }` }>
        { this.props.label }
      </a>;
    } else {
      return <button
        type={ this.props.type }
        className={ `btn btn-${ this.props.style } ${ this.props.additionalclass }` }
        onClick={ this.props.onClick }
      >
        { this.props.label }
      </button>;
    }
  }
});

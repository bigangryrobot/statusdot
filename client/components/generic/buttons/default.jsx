DefaultButton = React.createClass({
  render() {
    return <Button
      type={ this.props.type }
      style="default"
      label={ this.props.label }
      additionalclass={ this.props.additionalclass }
      href={ this.props.href }
      onClick={ this.props.onClick }
    />;
  }
});

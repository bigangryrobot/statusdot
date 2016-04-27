PrimaryButton = React.createClass({
  render() {
    return <Button
      type={ this.props.type }
      style="primary"
      label={ this.props.label }
      href={ this.props.href }
      additionalclass={ this.props.additionalclass }
      onClick={ this.props.onClick }
    />;
  }
});

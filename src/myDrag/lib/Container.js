import React, {Component} from 'react';
import {View} from 'react-native';
class Container extends Component {
  ref;
  onLayoutCallback = () => {};
  UNSAFE_componentWillReceiveProps({changed}) {
    if (changed && !this.props.changed && this.state?.mounted) {
      this.onSetLayout(null);
    }
  }
  componentDidMount() {
    this.setState({mounted: true});
  }
  componentWillUnmount() {
    this.setState({mounted: false});
  }
  onSetLayout = e => {
    if (this.state?.mounted) {
      if (this.ref.current) {
        if (this.ref.current.measure) {
          this.ref.current.measure((fx, fy, width, height, px, py) => {
            const layout = {
              x: px,
              y: py,
              width,
              height,
            };
            if (this.state?.mounted) {
              this.setState({layout}, this.onLayoutCallback);
            }
          });
        } else if (e && this.state?.mounted) {
          this.setState({layout: e.nativeEvent.layout}, this.onLayoutCallback);
        }
      } else {
        setTimeout(() => {
          this.onSetLayout(e);
        }, 1000);
      }
    }
  };
  render() {
    const {children} = this.props;
    return React.createElement(
      View,
      {ref: this.ref, onLayout: e => this.onSetLayout(e)},
      React.cloneElement(children, {
        layout: this.state.layout,
      }),
    );
  }
}
export default Container;

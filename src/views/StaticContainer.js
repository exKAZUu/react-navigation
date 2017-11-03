/* @flow */

import React from 'react';

type Props = {|
  children: React.Children<*>,
  shouldUpdate: boolean,
|};

export default class StaticContainer extends React.Component {
  props: Props;

  shouldComponentUpdate(nextProps: Props) {
    return !!nextProps.shouldUpdate;
  }

  render() {
    const child = this.props.children;
    if (child === null || child === false) {
      return null;
    }
    return React.Children.only(child);
  }
}

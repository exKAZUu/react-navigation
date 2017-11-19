/* @flow */

import * as React from 'react';
import propTypes from 'prop-types';

import type {
  NavigationScreenProp,
  NavigationComponent,
  NavigationRoute,
  NavigationScene,
} from '../TypeDefinition';

type Props = {
  screenProps?: {},
  navigation: NavigationScreenProp<*>,
  component: NavigationComponent,
  scene?: NavigationScene,
};

class StaticContainer extends React.Component {
  shouldComponentUpdate(nextProps: Object) {
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

export default class SceneView extends React.PureComponent<Props> {
  static childContextTypes = {
    navigation: propTypes.object.isRequired,
  };

  getChildContext() {
    return {
      navigation: this.props.navigation,
    };
  }

  render() {
    const { screenProps, navigation, component: Component, scene } = this.props;

    return (
      <StaticContainer shouldUpdate={scene.isActive}>
        <Component screenProps={screenProps} navigation={navigation} />
      </StaticContainer>
    );
  }
}

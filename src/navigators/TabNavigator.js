/* @flow */

import React from 'react';
import { Platform } from 'react-native';

import createNavigator from './createNavigator';
import createNavigationContainer from '../createNavigationContainer';
import TabRouter from '../routers/TabRouter';
import TabView from '../views/TabView/TabView';
import TabBarTop from '../views/TabView/TabBarTop';
import TabBarBottom from '../views/TabView/TabBarBottom';

import NavigatorTypes from './NavigatorTypes';

import type { TabViewConfig } from '../views/TabView/TabView';

import type {
  NavigationRouteConfigMap,
  NavigationTabRouterConfig,
} from '../TypeDefinition';

export type TabNavigatorConfig = {
  containerOptions?: void,
} & NavigationTabRouterConfig &
  TabViewConfig;

const TabNavigator = (
  routeConfigs: NavigationRouteConfigMap,
  config: TabNavigatorConfig = {}
) => {
  // Use the look native to the platform by default
  const mergedConfig = { ...TabNavigator.Presets.Default, ...config };
  const {
    tabBarComponent,
    tabBarPosition,
    tabBarOptions,
    swipeEnabled,
    animationEnabled,
    lazy,
    initialLayout,
    ...tabsConfig
  } = mergedConfig;

  const router = TabRouter(routeConfigs, tabsConfig);

  const navigator = createNavigator(
    router,
    routeConfigs,
    config,
    NavigatorTypes.TABS
  )((props: *) => (
    // Flow doesn't realize TabView already has childNavigationProps from
    // withCachedChildNavigation for some reason. $FlowFixMe
    <TabView
      {...props}
      tabBarComponent={tabBarComponent}
      tabBarPosition={tabBarPosition}
      tabBarOptions={tabBarOptions}
      swipeEnabled={swipeEnabled}
      animationEnabled={animationEnabled}
      lazy={lazy}
      initialLayout={initialLayout}
    />
  ));

  return createNavigationContainer(navigator);
};

const Presets = {
  iOSBottomTabs: {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: false,
    initialLayout: undefined,
  },
  AndroidTopTabs: {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: false,
    initialLayout: undefined,
  },
};

/**
 * Use these to get Android-style top tabs even on iOS or vice versa.
 *
 * Example:
 * ```
 * const HomeScreenTabNavigator = TabNavigator({
 *  Chat: {
 *    screen: ChatScreen,
 *  },
 *  ...
 * }, {
 *  ...TabNavigator.Presets.AndroidTopTabs,
 *  tabBarOptions: {
 *    ...
 *  },
 * });
 *```
 */
TabNavigator.Presets = {
  iOSBottomTabs: Presets.iOSBottomTabs,
  AndroidTopTabs: Presets.AndroidTopTabs,
  Default:
    Platform.OS === 'ios' ? Presets.iOSBottomTabs : Presets.AndroidTopTabs,
};

export default TabNavigator;

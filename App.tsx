import React from 'react';
import ScreenNavigation from './src/utils/ScreenNavigation';

const App = () => {
  //react-navigation is used for this app as is this is my go-to selection for navigation
  return <ScreenNavigation initial={'Home'} />;
};

export default App;

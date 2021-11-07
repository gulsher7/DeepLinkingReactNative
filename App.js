import React, { useEffect } from 'react';
import { View } from 'react-native';
import Routes from './src/Navigation/Routes';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import NavigationService from './src/Navigation/NavigationService';

const App = () => {

  useEffect(() => {
    dynamicLinks().getInitialLink().then((link) => {
      handleDynamicLink(link)
    })
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    }
  }, [])

  const handleDynamicLink = (link) => {
    console.log("link url++++", link)
    if (!!link?.url) {
      let getId = link.url?.split('=').pop()
      console.log("user id", getId)
      setTimeout(() => {
        NavigationService.navigate('UserDetail', { userId: getId })
      }, 1000);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  );
};

export default App;

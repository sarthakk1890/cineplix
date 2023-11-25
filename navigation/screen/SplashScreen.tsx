import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import Logo from '../../splashLogo.png'

const SplashScreen: React.FC = ({navigation}: any) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 1500);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
      <Image source={Logo}/>
    </View>
  );
};


export default SplashScreen;

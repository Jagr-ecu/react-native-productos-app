import React from 'react';
import { View, Image } from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={{
        alignItems: 'center',
    }}>
        <Image
            source={require('../assets/logo.png')}
            style={{
                width: 110,
                height: 100,
            }}
        />
    </View>
  )
}

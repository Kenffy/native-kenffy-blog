import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import React from 'react';
import Swiper from 'react-native-swiper';

export default function ImageSlider({images, height, enableButtons=false, autoplay=false}) {
  return (
    <View>
      <Swiper height={height} 
      showsButtons={enableButtons} 
      autoplay={autoplay}
      dot={
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,.3)',
            width: 8,
            height: 8,
            borderRadius: 7,
            marginLeft: 7,
            marginRight: 7
          }}/>
        }
        activeDot={
            <View
              style={{
                backgroundColor: 'teal',
                width: 8,
                height: 8,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }

        paginationStyle={{
            bottom: 10
        }}
        >
        {images.map((img, index)=>(
            <Image style={{
                width: '100%',
                height: '100%',
            }} 
            key={index}
            preview={{uri: img?.url}} 
            uri={img.url}/>
        ))}
      </Swiper>
    </View>
  )
}
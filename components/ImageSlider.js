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
            width: 7,
            height: 7,
            borderRadius: 5,
            marginLeft: 4,
            marginRight: 4
          }}/>
        }
        activeDot={
            <View
              style={{
                backgroundColor: 'teal',
                width: 7,
                height: 7,
                borderRadius: 5,
                marginLeft: 4,
                marginRight: 4
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
import { StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components/native";
import HTMLView from 'react-native-htmlview';
import ImageSlider from '../components/ImageSlider';
import YoutubePlayer from "react-native-youtube-iframe";
import { Image } from 'react-native-expo-image-cache';
import { getPostAsync } from '../services/firestoreServices';
import { CategoryData } from '../seed/CategoryData';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const height = width / 1.7;

export default function SingleScreen({navigation, route}) {

  const postId = route?.params.id;
  const [post, setPost] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [playing, setPlaying] = useState(false);

  useEffect(()=>{
    const loadData = async()=>{
      try {
        const res_post = await getPostAsync(postId);
        //const res_user = await getUserAsync(authorId);
        if(res_post){
          setPost(res_post);
          if(res_post?.video){
            const tmpId = getVideoId(res_post?.video);
            setVideoId(tmpId);
          }
          //setLiked(res_post.likes.includes(user?.uid));
        }
        //res_user && setAuthor(res_user);
      } catch (error) {
        console.log(error);
      }
    }
    postId && loadData();
  },[postId])

  const getVideoId = (url) =>{
    if(url.includes('watch?v=')){
      const tmpId = url.split('watch?v=')[1];
      if(tmpId.includes('&t=')){
        return tmpId.split('&t=')[0]
      }else{
        return tmpId;
      }
    }else if(url.includes('youtu.be')){
      const tmpId = url.split('youtu.be/')[1];
      if(tmpId.includes('&t=')){
        return tmpId.split('&t=')[0]
      }else{
        return tmpId;
      }
    }else{
        return url;
    }
  }

  const category = CategoryData.find(c=>c.name === post?.category) || CategoryData[1];

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  return (
    <Container>
      <ButtonBack onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25} style={{color: 'teal'}}/>
      </ButtonBack>
      <ScrollView>
      {post?.images.length > 1 ?
        <ImageSlider 
        height={height}
        images={post?.images} />
        :
        <>
        {post?.images.length === 0 ?
        <CategoryImage height={height}
          source={category?.icon}/>
        :
        <Image 
          style={{height}}
          preview={{uri: post?.images[0]?.url}}
          uri={post?.images[0]?.url}/>}
        </>        
      }

        <Title>{post?.title}</Title>
        <BodyWrapper>
          <HTMLView 
          height={height}
          stylesheet={styles}
          value={post?.body}/>
        </BodyWrapper>

        <YoutubePlayer
        height={height}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}/>

      </ScrollView>
    </Container>
  )
};


const styles = StyleSheet.create({
  p: {
      fontSize: 16,
      color: '#444',
      padding: 0,
  },
  a:{
      fontSize: 16,
      color: 'teal',
  },
  img:{
    width: '100%',
    height: `${props=> `${props.height}px`}`,
  }
});

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    position: relative;
`;

const CategoryImage = styled.Image`
width: 100%;
height: ${props=> `${props.height}px`};
`;

const ButtonBack = styled.TouchableOpacity`
height: 40px;
width: 40px;
border-radius: 50%;
background-color: rgba(0,0,0,0.2);
align-self: center;
justify-content: center;
align-items: center;
position: absolute;
top: 5px;
left: 5px;
z-index: 100;
`;

const Title = styled.Text`
font-size: 20px;
font-weight: 600;
color: #444;
padding: 10px;
`;

const BodyWrapper = styled.View`
padding: 10px;
`;
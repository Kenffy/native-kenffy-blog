import { Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useCallback } from 'react';
import styled from "styled-components/native";
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from './Avatar';
import { Image } from 'react-native-expo-image-cache';
import { CategoryData } from '../seed/CategoryData';
import ImageSlider from './ImageSlider';
import HTMLView from 'react-native-htmlview';

const width = Dimensions.get('window').width;
const height = width / 1.8;


export default function PostCard({post, navigation}) {

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

  const videoId = getVideoId(post?.video);
  const [toggle, setToggle] = useState(post?.video? true: false);
  const [playing, setPlaying] = useState(false);
  const category = CategoryData.find(c=>c.name === post?.category) || CategoryData[1];

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const handleOnPress = ()=>{
    console.log('go to single post.')
    navigation.navigate('Single', {id: post?.id});
  }

  return (
    <Container>
        {!toggle && post?.video?
        <YoutubePlayer
        height={height}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}/>
        :
        <>
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
        </>
        }
      <InfoWrapper>
        <InfoItem>
            <Ionicons name="calendar-outline" size={16} style={{color: 'teal'}}/>
            <ItemValue>{new Date(post?.createdAt).toDateString()}</ItemValue>
        </InfoItem>
        <InfoItem>
            <Ionicons name="file-tray-outline" size={16} style={{color: 'teal'}}/>
            <ItemValue>{post?.category}</ItemValue>
        </InfoItem>
        {post?.video?
        <TouchableOpacity onPress={()=>setToggle(!toggle)}>
            <InfoItem>
                <Ionicons name="sync-outline" size={16} style={{color: 'teal'}}/>
                <ItemValue>{toggle? 'Video': 'Images'}</ItemValue>
            </InfoItem>
        </TouchableOpacity>
        :
        <InfoItem>
            <Ionicons name="image-outline" size={16} style={{color: 'teal'}}/>
            <ItemValue>{toggle? 'Video': 'Images'}</ItemValue>
        </InfoItem>}
      </InfoWrapper>

      <TouchableOpacity onPress={handleOnPress}>
        <Title>{post?.title}</Title>
      </TouchableOpacity>

      <BodyWrapper>
        <HTMLView 
        stylesheet={styles}
        value={post?.body.length > 150? post?.body?.slice(0, 150)+"...":post?.body}/>
      </BodyWrapper>
      
      <FooterWrapper>
        <UserInfos>
            <Avatar source={post?.profile?.url} />
            <Username>{post?.username}</Username>
            {post?.status === "Public" &&
            <Ionicons name="earth-outline" size={16} style={{color: 'teal'}}/>
            }
            {post?.status === "Private" &&
            <Ionicons name="lock-closed-outline" size={16} style={{color: 'teal'}}/>
            }
            {post?.status === "Friends" &&
            <Ionicons name="people-outline" size={16} style={{color: 'teal'}}/>
            }
        </UserInfos>
        <ActionsWrapper>
            <FooterItem>
                <Ionicons name="heart-outline" size={18} style={{color: 'teal'}}/>
                <FooterValue>{post?.likes? post?.likes.length:0}</FooterValue>
            </FooterItem>
            <FooterItem>
                <Ionicons name="eye-outline" size={18} style={{color: 'teal'}}/>
                <FooterValue>{post?.views}</FooterValue>
            </FooterItem>
            <FooterItem>
                <Ionicons name="chatbubbles-outline" size={18} style={{color: 'teal'}}/>
                <FooterValue>{post?.comments? post?.comments.length:0}</FooterValue>
            </FooterItem>
        </ActionsWrapper>
      </FooterWrapper>
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
  }
});

const Container = styled.View`
    flex: 1;
    border-radius: 5px;
    overflow: hidden;
    background-color: white;
    margin: 10px 0;
    padding-bottom: 5px;
    box-shadow: 0 .5rem 1.5rem rgba(0,0,0,0.8);
`;


const CategoryImage = styled.Image`
width: 100%;
height: ${props=> `${props.height}px`};
`;

const Title = styled.Text`
font-size: 18px;
font-weight: 500;
color: #444;
padding: 10px;
`;

const BodyWrapper = styled.View`
padding: 10px;
`;

const InfoWrapper = styled.View`
margin-top: 8px;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 5px 10px;
`;

const InfoItem = styled.View`
flex-direction: row;
align-items: center;
`;

const ItemValue = styled.Text`
color: teal;
font-size: 14px;
margin-left: 5px;
`;


const UserInfos = styled.View`
flex-direction: row;
align-items: center;
`;

const Username = styled.Text`
color: teal;
font-size: 14px;
margin: 0 6px;
`;

const FooterWrapper = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 5px 10px;
`;

const ActionsWrapper = styled.View`
flex-direction: row;
align-items: center;
`;

const FooterItem = styled.View`
flex-direction: row;
align-items: center;
margin-left: 10px;
`;

const FooterValue = styled.Text`
color: teal;
font-size: 15px;
margin-left: 3px;
`;


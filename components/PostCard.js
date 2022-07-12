import { Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import styled from "styled-components/native";
import Slideshow from 'react-native-image-slider-show';
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HTMLView from 'react-native-htmlview';
import Avatar from './Avatar';
import { Image } from 'react-native-expo-image-cache';

const width = Dimensions.get('window').width;
const height = width / 2;


export default function PostCard({post}) {

  const getVideoId = (url) =>{
    return url.split('watch?v=')[1];
    // if(url.contains('watch?v=')){
    //     return url.split('watch?v=')[1];
    // }else if(url.contains('youtu.be')){
    //     return url.split('youtu.be/')[1];
    // }else{
    //     return url;
    // }
  }

  const [toggle, setToggle] = useState(post?.video? true: false);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const handleOnPress = ()=>{
    console.log('go to single post.')
  }

  return (
    <Container>
        {!toggle && post?.video?
        <YoutubePlayer
        height={height}
        play={playing}
        videoId={post?.video.split('watch?v=')[1]}
        onChangeState={onStateChange}/>
        :
        <Image 
        style={{height}}
        preview={{uri: post?.images[0]?.url}}
        uri={post?.images[0]?.url}/>
        // <MediaImages
        // height={height}
        // dataSource={post?.images} />
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
        <TouchableOpacity onPress={()=>setToggle(!toggle)}>
            <InfoItem>
                <Ionicons name="sync-outline" size={16} style={{color: 'teal'}}/>
                <ItemValue>{toggle? 'Video': 'Images'}</ItemValue>
            </InfoItem>
        </TouchableOpacity>
      </InfoWrapper>

      <TouchableOpacity onPress={handleOnPress}>
        <Title>{post?.title}</Title>
      </TouchableOpacity>
      
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
      
      {/* <BodyWrapper>
        <HTMLView 
        stylesheet={styles}
        value={post?.body.length > 80? post?.body?.slice(0, 80)+"...":post?.body}/>
      </BodyWrapper> */}
      
    </Container>
  )
}

const styles = StyleSheet.create({
    p: {
        fontSize: 15,
        color: '#444',
    },
    a:{
        fontSize: 15,
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

const MediaImages = styled(Slideshow)`
height: ${props=> `${props.height}px`};
`;

const Title = styled.Text`
font-size: 18px;
font-weight: 500;
color: #444;
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

const BodyWrapper = styled.View`
padding: 10px;
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


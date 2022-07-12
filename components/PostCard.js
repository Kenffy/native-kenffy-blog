import { Text, Dimensions } from 'react-native';
import React, { useState, useCallback } from 'react';
import styled from "styled-components/native";
import Slideshow from 'react-native-image-slider-show';
import YoutubePlayer from "react-native-youtube-iframe";
import HTMLView from 'react-native-htmlview';
import Avatar from './Avatar';

const width = Dimensions.get('window').width;
const height = width / 1.7;


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

  return (
    <Container>
        {!toggle && post?.video?
        <YoutubePlayer
        height={height}
        play={playing}
        videoId={post?.video.split('watch?v=')[1]}
        onChangeState={onStateChange}/>
        :
        <MediaImages
        height={height}
        dataSource={post?.images} />
        }
      <InfoWrapper>
        <CreateDate>{new Date(post?.createdAt).toDateString()}</CreateDate>
        <Category>{post?.category}</Category>
        <ToggleVideo onPress={()=>setToggle(!toggle)}>
            <VideoBtn>{toggle? 'Video': 'Images'}</VideoBtn>
        </ToggleVideo>
      </InfoWrapper>
      <Title>{post?.title}</Title>
      <UserInfos>
        <Avatar source={post?.profile?.url} />
        <Username>{post?.username}</Username>
      </UserInfos>
      <Body value={post?.body.length > 80? post?.body?.slice(0, 80)+"...":post?.body}/>
    </Container>
  )
}

const Container = styled.View`
    flex: 1;
    border-radius: 5px;
    overflow: hidden;
    background-color: white;
    margin: 10px 0;
    padding-bottom: 30px;
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

const Body = styled(HTMLView)`
font-size: 15px;
color: #444;
padding: 0 10px;
`;

const InfoWrapper = styled.View`
flex-direction: row;
justify-content: space-between;
padding: 5px 10px;
`;

const CreateDate = styled.Text`
color: teal;
`;

const Category = styled.Text`
color: teal;
`;

const VideoBtn = styled.Text`
color: teal;
`;

const ToggleVideo = styled.TouchableOpacity`
`;

const UserInfos = styled.View`
flex-direction: row;
align-items: center;
padding: 5px 10px;
`;

const Username = styled.Text`
color: teal;
margin-left: 5px;
`;


const CatInfos = styled.View`

`;


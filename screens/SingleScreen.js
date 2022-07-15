import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components/native";
import HTMLView from 'react-native-htmlview';
import ImageSlider from '../components/ImageSlider';
import YoutubePlayer from "react-native-youtube-iframe";
import { Image } from 'react-native-expo-image-cache';
import { getPostAsync } from '../services/firestoreServices';
import { CategoryData } from '../seed/CategoryData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from '../components/Avatar';
import OtherPosts from '../components/OtherPosts';
import PostComments from '../components/PostComments';

const width = Dimensions.get('window').width;
const height = width / 1.7;

export default function SingleScreen({navigation, route}) {

  const postId = route?.params.id;
  const [post, setPost] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const loadData = async()=>{
      try {
        setLoading(true);
        const res_post = await getPostAsync(postId);
        //const res_user = await getUserAsync(authorId);
        if(res_post){
          setPost(res_post);
          if(res_post?.video){
            const tmpId = getVideoId(res_post?.video);
            setVideoId(tmpId);
          }
          //setLiked(res_post.likes.includes(user?.uid));
          setLoading(false);
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
          <Ionicons name="arrow-back-outline" size={25} style={{color: 'whitesmoke', opacity: 0.6}}/>
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

          {loading?
          <LoadingView>
            <LoadingText>Please wait...</LoadingText>
          </LoadingView>
          :
          <>
          <Title>{post?.title}</Title>
          <InfoWrapper>
            <UserInfos>
                <Avatar source={post?.profile?.url} />
                <Username>{post?.username}</Username>
            </UserInfos>
            <InfoItem>
                <Ionicons name="time-outline" size={16} style={{color: 'teal'}}/>
                <ItemValue>{new Date(post?.createdAt).toDateString()}</ItemValue>
            </InfoItem>
            <InfoItem>
                <Ionicons name="file-tray-outline" size={16} style={{color: 'teal'}}/>
                <ItemValue>{post?.category}</ItemValue>
            </InfoItem>
          </InfoWrapper>
          <BodyWrapper>
            <HTMLView 
            height={height}
            stylesheet={styles}
            value={post?.body}/>
          </BodyWrapper>

          {videoId.length > 0 &&
          <YoutubePlayer
          height={height}
          play={playing}
          videoId={videoId}
          onChangeState={onStateChange}/>}

          {post?.tags.length > 0 && 
          <TagsWrapper>
            {post?.tags.map((tag,index)=>(
              <Tag key={index}>#{tag}</Tag>
            ))}
          </TagsWrapper>
          }

          <ActionsWrapper>
            <FooterItem>
                <Ionicons name="heart-outline" size={20} style={{color: 'teal'}}/>
                <FooterValue>{post?.likes? post?.likes.length:0}</FooterValue>
            </FooterItem>
            <FooterItem>
                <Ionicons name="eye-outline" size={21} style={{color: 'teal'}}/>
                <FooterValue>{post?.views}</FooterValue>
            </FooterItem>
            <FooterItem>
                <Ionicons name="chatbubbles-outline" size={20} style={{color: 'teal'}}/>
                <FooterValue>{post?.comments? post?.comments.length:0}</FooterValue>
            </FooterItem>
            <FooterItem>
                <Ionicons name="arrow-redo-outline" size={20} style={{color: 'teal'}}/>
            </FooterItem>
          </ActionsWrapper>

          <SubWrapper>
            <SubTitle>Leave a comment</SubTitle>
            <PostComments post={post}/>
          </SubWrapper>

          {/* <SubWrapper>
            <SubTitle>{post?.comments.length > 1 ? `${post?.comments.length} Comments`:`${post?.comments.length} Comment`}</SubTitle>
          </SubWrapper> */}

          <SubWrapper>
            <SubTitle>Other Articles</SubTitle>
            {post && <OtherPosts navigation={navigation} userId={post?.userId} postId={post?.id}/>}
          </SubWrapper>
        </>
        }
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
    backgroundColor: 'gray',
    height: `${props=> `${props.height}px`}`,
  },
  h2:{
    fontSize: 18,
  },
});

const Container = styled.View`
    flex: 1;
    background-color: #fff;
    position: relative;
`;

const LoadingView = styled.View`
justify-content: center;
padding: 20px 0;
flex: 1;
`;

const LoadingText = styled.Text`
text-align: center;
font-size: 20px;
color: teal;
`;

const CategoryImage = styled.Image`
width: 100%;
height: ${props=> `${props.height}px`};
`;

const ButtonBack = styled.TouchableOpacity`
height: 40px;
width: 40px;
border-radius: 50px;
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

const UserInfos = styled.View`
flex-direction: row;
align-items: center;
`;

const Username = styled.Text`
color: teal;
font-size: 14px;
margin: 0 6px;
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

const BodyWrapper = styled.View`
padding: 10px;
`;

const TagsWrapper = styled.View`
flex-direction: row;
padding: 10px;
flex-wrap: wrap;
`;

const Tag = styled.Text`
font-weight: 500;
color: teal;
margin-left: 3px;
`;

const ActionsWrapper = styled.View`
flex-direction: row;
align-items: center;
justify-content: flex-end;
margin: 5px 0;
padding: 10px;
`;

const FooterItem = styled.View`
flex-direction: row;
align-items: center;
margin-left: 15px;
`;

const FooterValue = styled.Text`
color: teal;
font-size: 18px;
margin-left: 3px;
`;

const SubWrapper = styled.View`
padding: 10px;
margin-top: 20px;
`;

const SubTitle = styled.Text`
font-size: 18px;
font-weight: 600;
color: #444;
`;
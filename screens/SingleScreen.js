import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useCallback, Component } from 'react';
import styled from "styled-components/native";
import HTMLView from 'react-native-htmlview';
import ImageSlider from '../components/ImageSlider';
import YoutubePlayer from "react-native-youtube-iframe";
import { Image } from 'react-native-expo-image-cache';
import { CategoryData } from '../seed/CategoryData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OtherPosts from '../components/OtherPosts';
import PostComments from '../components/PostComments';

const width = Dimensions.get('window').width;
const height = width / 1.7;

export class SingleScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      post: this.props.route.params,
      postId: this.props.route.params?.id,
      videoId: null,
      playing: false,
      loading: true,
      defaultImg: require('../assets/images/noProfile.png'),
      category: CategoryData[1],
    }
  }

  componentDidMount(){
    if(this.state.post?.video){
      const tmpId = this.getVideoId(this.state.post?.video);
      const category = CategoryData.find(c=>c.name === this.state.post?.category) || CategoryData[1];
      this.setState({videoId: tmpId});
      this.setState({category: category});
      this.setState({loading: false});
    }
  }


  getVideoId = (url) =>{
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



  onStateChange = ((state) => {
    if (state === "ended") {
      setPlaying(false);
      this.setState({playing: false});
      Alert.alert("video has finished playing!");
    }
  });



  render() {
    const post = this.state.post;
      return(
        <Container>
        <ButtonBack onPress={()=>this.props.navigation.pop()}>
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
            source={this.state.category?.icon}/>
          :
          <Image 
            style={{height}}
            preview={{uri: post?.images[0]?.url}}
            uri={post?.images[0]?.url}/>}
          </>        
        }

          {this.state.loading?
          <LoadingView>
            <LoadingText>Please wait...</LoadingText>
          </LoadingView>
          :
          <>
          <Title>{post?.title}</Title>
          <InfoWrapper>
            <UserInfos>
              {post?.profile? 
              <Avatar 
              preview={{uri: post?.profile.url}}
              uri={post?.profile.url} />
              :
              <LocalAvatar source={this.state.defaultImg} />
              }
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

          {this.state?.videoId.length > 0 &&
          <YoutubePlayer
          height={height}
          play={this.state.playing}
          videoId={this.state.videoId}
          onChangeState={this.onStateChange}/>}

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
            {post && <OtherPosts navigation={this.props.navigation} userId={post?.userId} postId={post?.id}/>}
          </SubWrapper>
        </>
        }
        </ScrollView>
      </Container>
      )
    }
};

export default SingleScreen;

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

const Avatar = styled(Image)`
height: 40px;
width: 40px;
border-radius: 50px;
overflow: hidden;
`;

const LocalAvatar = styled.Image`
height: 40px;
width: 40px;
border-radius: 50px;
border-width: 1px;
border-color: rgba(0,0,0,0.08);
overflow: hidden;
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
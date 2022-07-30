import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { getAllPostsAsync } from '../services/firestoreServices';
import PostCard from './PostCard';


export default function RecentPosts({navigation}) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  

  useEffect(()=>{
    loadAllPosts();
  },[]);

  const loadAllPosts = async()=>{
    setLoading(true);
    const filter = {category: "All", sort: "Date DESC", status: "Public", limit: 12}
    const res = await getAllPostsAsync(filter);
    if(res){
      setPosts(res.posts);
      setLoading(false);
    }
  }


  return (
    <Container>
      <Header>RECENTS POSTS</Header>
      {posts.length > 0 &&
      <View>
      {posts.map(post=>
      (<PostCard post={post} key={post?.id} navigation={navigation}/>)
      )}
      </View>
      }
      {loading &&
      <LoadingView>
        <LoadingText>Loading...</LoadingText>
      </LoadingView>
      }
      <MoreButton onPress={()=>navigation.navigate('Posts')}>
        <ButtonText>More Posts</ButtonText>
      </MoreButton>
    </Container>
  )
}

const Container = styled.View`
padding: 10px;
background-color: rgba(0,0,0,0.05);
padding-bottom: 30px;
`;

const Header = styled.Text`
padding: 10px 0;
font-size: 24px;
font-weight: 900;
text-align: center;
color: #444;
`;

const LoadingView = styled.View`
justify-content: center;
padding: 20px 0;
`;

const LoadingText = styled.Text`
text-align: center;
font-size: 20px;
color: teal;
`;

const MoreButton = styled.TouchableOpacity`
align-self: center;
justify-content: center;
background-color: #444;
width: 150px;
padding: 10px;
border-radius: 5px;
margin-top: 15px;
`;

const ButtonText = styled.Text`
text-align: center;
text-transform: uppercase;
color: #fff;
`;


import React, {useState, useEffect} from 'react';
import { getOtherUserPostsAsync } from '../services/firestoreServices';
import styled from "styled-components/native";
import OtherPostCard from './OtherPostCard';

export default function OtherPosts({userId, postId, navigation}) {

    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const loadAllPosts = async()=>{
            const res = await getOtherUserPostsAsync(userId, postId);
            res && setPosts(res); 
        }
        loadAllPosts();
      },[postId, userId]);

  return (
    <Container>
        {posts.map(post=>(
            <OtherPostCard navigation={navigation} key={post?.id} post={post}/>
        ))}
    </Container>
  )
};

const Container = styled.View`
padding: 10px 0;
padding-bottom: 30px;
`;
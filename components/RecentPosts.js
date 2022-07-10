import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllPostsAsync } from '../services/firestoreServices';

export default function RecentPosts() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const loadAllPosts = async()=>{
      setLoading(true);
      const filter = {category: "All", sort: "Date DESC", status: "Public", limit: 12}
      const res = await getAllPostsAsync(filter);
      if(res){
        setPosts(res.posts);
        setLoading(false);
      }
    }
    loadAllPosts();
  },[]);
  console.log(loading)
  console.log(posts)


  return (
    <View>
      <Text>RecentPosts</Text>
    </View>
  )
}
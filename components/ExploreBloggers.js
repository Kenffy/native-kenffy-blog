
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import TopBar from './TopBar';
import UserCard from './UserCard';
import { getAllUsersAsync } from '../services/firestoreServices';

export default function ExploreBloggers({navigation}) {

  const title = 'Explore All Bloggers';

  const [last, setLast] = useState(null);
  const [users, setUsers] = useState([]);
  const [userSize, setUserSize] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const loadAllUsers = async()=>{
      setLoading(true);
      const filter = {limit: 12,
                      lastVisible: null,}
      const res = await getAllUsersAsync(filter);
      if(res){
        setUsers(res.users);
        setLast(res.lastVisible);
        setUserSize(res.size)
        setHasMore((res.users.length < res.size));
        setLoading(false);
      }
    }
    loadAllUsers();
  },[]);

  const handleLoadMore = async()=>{
    if(users.length >= userSize) return;
    
    setLoading(true);
    const filter = {lastVisible: last, limit: 10}

    const res = await getAllUsersAsync(filter);
    if(res){
      setUsers([...users, ...res.users]);
      setLast(res.lastVisible);
      setUserSize(res.size)
      setHasMore((res.users.length < res.size));
      setLoading(false);
    }
  }

  const renderItem = ({ item }) => (
    <UserCard user={item} navigation={navigation}/>
  );

  return (
    <Container>
      <TopBar navigation={navigation} title={title} enableSearch={true}/>
      <List
        data={users}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
      />
      {loading &&
      <LoadingView>
        <LoadingText>Please wait...</LoadingText>
      </LoadingView>
      }
    </Container>
  )
};


const Container = styled.View`
flex: 1;
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

const List = styled.FlatList`
padding: 10px;
padding-bottom: 10px;
`;
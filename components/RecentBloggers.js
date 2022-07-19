import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { getAllUsersAsync } from '../services/firestoreServices';
import UserCard from './UserCard';

export default function RecentBloggers({navigation}) {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(()=>{
    const loadAllUsers = async()=>{
      setLoading(true);
      const filter = {limit: 12,
                      lastVisible: null,}
      const res = await getAllUsersAsync(filter);
      if(res){
          setUser(res.users);
          setLoading(false);
        }
    }
    loadAllUsers();
  },[]);


  return (
    <Container>
      <Header>EXPLORE BLOGGERS</Header>
      {users.length > 0 &&
      <Wrapper>
      {users.map(user=>
      (<UserCard user={user} key={user?.id}/>)
      )}
      </Wrapper>
      }
      {loading &&
      <LoadingView>
        <LoadingText>Loading...</LoadingText>
      </LoadingView>
      }
      <MoreButton onPress={()=>navigation.navigate('Bloggers')}>
        <ButtonText>More Bloggers</ButtonText>
      </MoreButton>
    </Container>
  )
};


const Container = styled.View`
padding: 10px;
background-color: #fff;
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

const Wrapper = styled.View`
flex-direction: row;
flex-wrap: wrap;
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
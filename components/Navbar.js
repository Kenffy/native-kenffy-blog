import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-expo-image-cache';

export default function Navbar({navigation}) {
  const user  = useSelector((state) => state.auth.user);
  const defaultImg = require('../assets/images/noProfile.png');
  return (
    <Container>
      <Logo>
        <Short>K</Short>
        <Long>Blog</Long>
      </Logo>
      <Wrapper>
        {user &&
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          {user?.profile? 
          <Avatar 
          preview={{uri: user?.profile}}
          uri={user?.profile} />
          :
          <LocalAvatar source={defaultImg} />
          }
        </TouchableOpacity>
        }
        <TouchableOpacity style={{marginLeft: 10}} onPress={()=>navigation.openDrawer()}>
          <Ionicons name="reorder-three" size={35} style={{color: '#444'}}/>
        </TouchableOpacity>
      </Wrapper>
    </Container>
  )
};

const Container = styled.SafeAreaView`
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom-width: 1px;
    border-bottom-color: rgba(0,0,0,0.1);
    box-shadow:0 .5rem 1.5rem rgba(0,0,0,.5);
`;

const Logo = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

const Short = styled.Text`
    font-weight: bold;
    color: #444;
    font-size: 22px;
`;

const Long = styled.Text`
    font-weight: bold;
    color: teal;
    font-size: 22px;
`;

const Wrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Avatar = styled(Image)`
height: 30px;
width: 30px;
border-radius: 50px;
overflow: hidden;
`;

const LocalAvatar = styled.Image`
height: 30px;
width: 30px;
border-radius: 50px;
border-width: 1px;
border-color: rgba(0,0,0,0.08);
overflow: hidden;
`;



import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Avatar from './Avatar';

export default function Navbar({navigation}) {
  return (
    <Container>
      <Logo>
        <Short>K</Short>
        <Long>Blog</Long>
      </Logo>
      <Wrapper>
        <TouchableOpacity onPress={()=>navigation.openDrawer()}>
          <Avatar source="https://media.istockphoto.com/photos/mature-businessman-smiling-over-white-background-picture-id685132245?k=20&m=685132245&s=612x612&w=0&h=oKxgMF_dOhoGJtd_YxhbmpK4qFvcl-0s0NFmxuh7IKA="
          online={true}/>
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



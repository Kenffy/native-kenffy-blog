import { View, Text, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

const width = Dimensions.get('window').width;

export default function Header() {

  const user  = useSelector((state) => state.auth.user);

  const backgrounds = [
    {id: 1, name: require('../assets/images/bg1.jpg')},
    {id: 2, name: require('../assets/images/bg2.jpg')},
    {id: 3, name: require('../assets/images/bg3.jpg')},
    {id: 4, name: require('../assets/images/bg4.jpg')},
    {id: 5, name: require('../assets/images/bg5.jpg')},
    {id: 6, name: require('../assets/images/bg6.jpg')},
    {id: 7, name: require('../assets/images/bg7.jpg')},
    {id: 8, name: require('../assets/images/bg8.jpg')},
    {id: 9, name: require('../assets/images/bg9.jpg')},
    {id: 10, name: require('../assets/images/bg10.jpg')},
    {id: 11, name: require('../assets/images/bg11.jpg')},
    {id: 12, name: require('../assets/images/bg12.jpg')},
    {id: 13, name: require('../assets/images/bg13.jpg')},
    {id: 14, name: require('../assets/images/bg14.jpg')},
    {id: 15, name: require('../assets/images/bg15.jpg')},
  ]

  const bgIndex = Math.floor(Math.random() * 15);
  return (
    <Container height={width / 1.2} source={backgrounds[bgIndex].name} resizeMode="cover">
      <Wrapper>
        <Welcome>{user? `Hello ${user?.username}! Welcome to`: 'Hello! Welcome to' }</Welcome>
        <Title>MY BLOG</Title>
        <Slogan>Let's make the Blogging great again.</Slogan>
      </Wrapper>
    </Container>
  )
};

const Container = styled.ImageBackground`
background-color: teal;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: ${props=> `${props.height}px`};
`;

const Wrapper = styled.View`
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
height: 100%;
background-color: rgba(0,0,0,0.4);
`;

const Welcome = styled.Text`
font-size: 18px;
color: white;
`;

const Title = styled.Text`
font-size: 30px;
font-weight: 500;
color: white;
margin-top: 10px;
`;

const Slogan = styled.Text`
font-size: 14px;
color: white;
margin-top: 10px;
`;
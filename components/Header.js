import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

export default function Header() {

  const bgIndex = Math.floor(Math.random() * 15) + 1;
  const bg = `../assets/images/bg${bgIndex}.jpg`;
  return (
    <Container>
      <Wrapper>
        <Welcome>Hello John Doe</Welcome>
        <Title>MY BLOG</Title>
        <Slogan>Let's make the Blogging great again.</Slogan>
      </Wrapper>
    </Container>
  )
};

const Container = styled.View`
background-color: teal;
//background-image: ${props=> `linear-gradient(transparent, rgba(0,0,0,0.8)), url(${props.bg})`};
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height: 500px;
`;

const Wrapper = styled.View`
display: flex;
align-items: center;
justify-content: center;
padding: 20px;
height: 100%;
margin-top: 50px;
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
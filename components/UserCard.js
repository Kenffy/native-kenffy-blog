import { TouchableOpacity } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-expo-image-cache';

export default function UserCard({user}) {
    const defaultImg = require('../assets/images/noProfile.png');

    const handleExplore = ()=>{
        console.log('load user')
    }
  return (
    <Container>
        {user?.profile? 
        <Avatar 
        preview={{uri: user?.profile.url}}
        uri={user?.profile.url} />
        :
        <LocalAvatar source={defaultImg} />
        }
      <Username>{user?.username}</Username>
      <Infos>{user?.subscribers.length} {user?.subscribers.length > 1? "Subscribers": "Subscriber"}</Infos>

      <Stars>
        <Ionicons name="star" size={14} style={{color: 'teal'}}/>
        <Ionicons name="star-half" size={14} style={{color: 'teal'}}/>
        <Ionicons name="star-outline" size={14} style={{color: 'teal'}}/>
        <Ionicons name="star-outline" size={14} style={{color: 'teal'}}/>
        <Ionicons name="star-outline" size={14} style={{color: 'teal'}}/>
      </Stars>

      <TouchableOpacity onPress={handleExplore}>
        <Button>
            <ButtonText>EXPLORE</ButtonText>
        </Button>
      </TouchableOpacity>
    </Container>
  )
}

const Container = styled.View`
padding: 10px;
background-color: #fff;
align-items: center;
justify-content: center;
margin: 6px auto;
width: 47%;
border-radius: 10px;
border: 1px solid rgba(0,0,0,0.1);
box-shadow:0 .5rem 1.5rem rgba(0,0,0,0.5);
`;

const Avatar = styled(Image)`
height: 80px;
width: 80px;
border-radius: 50px;
margin: 10px;
border-width: 1px;
border-color: rgba(0,0,0,0.08);
`;

const LocalAvatar = styled.Image`
height: 80px;
width: 80px;
border-radius: 50px;
margin: 10px;
border-width: 1px;
border-color: rgba(0,0,0,0.08);
`;

const Username = styled.Text`
font-size: 16px;
font-weight: 500;
padding: 0 5px;
color: #444;
text-align: center;
`;

const Infos = styled.Text`
margin-top: 5px;
`;

const Stars = styled.View`
flex-direction: row;
margin-top: 10px;
padding: 5px 8px;
border-radius: 3px;
background-color: rgba(0,0,0,0.1);
`;

const Button = styled.View`
margin-top: 15px;
margin-bottom: 10px;
padding: 8px 15px;
border-radius: 5px;
background-color: teal;
`;

const ButtonText = styled.Text`
color: #fff;
`;
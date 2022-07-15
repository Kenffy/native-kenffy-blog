import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import HTMLView from 'react-native-htmlview';
import { Image } from 'react-native-expo-image-cache';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CategoryData } from '../seed/CategoryData';

export default function OtherPostCard({post, navigation}) {
  const category = CategoryData.find(c=>c.name === post?.category) || CategoryData[1];
  const defaultImg = require('../assets/images/noProfile.png');

  const handleOtherPost = ()=>{
    post && navigation.navigate('Single', {id: post?.id});
  }
  return (
    <Container onPress={handleOtherPost}>
        <Top>
            {post?.images.length > 0 ?
            <CardImage 
            preview={{uri: post?.images[0]?.url}}
            uri={post?.images[0]?.url}/>
            :
            <CategoryImage 
            source={category?.icon}/>
            }
            
            <Wrapper>
                <Title>{post?.title}</Title>
                <BodyWrapper>
                <HTMLView
                stylesheet={styles}
                value={post?.body?.slice(0, 80)+"..."}/>
                </BodyWrapper>
                
            </Wrapper>
        </Top>
        <Bottom>
            <Item>
                {post?.profile? 
                <Avatar 
                preview={{uri: post?.profile.url}}
                uri={post?.profile.url} />
                :
                <LocalAvatar source={defaultImg} />
                }
                <Username>{post?.username}</Username>
            </Item>
            <Item>
                <Ionicons name="heart-outline" size={16} style={{color: 'teal'}}/>
                <ItemValue>{post?.likes? post?.likes.length:0}</ItemValue>
            </Item>
        </Bottom>
    </Container>
  )
};

const styles = StyleSheet.create({
    p: {
        fontSize: 15,
        color: '#444',
        padding: 0,
        margin: 0,
    },
    a:{
        fontSize: 15,
        color: 'teal',
    },
    img:{
      width: '100%',
      backgroundColor: 'gray',
      height: `${props=> `${props.height}px`}`,
    },
    b:{
        margin: 0,
        padding: 0,
    },
    h2:{
      fontSize: 18,
    },
  });

const Container = styled.TouchableOpacity`
padding: 10px;
border-radius: 10px;
border: 1px solid rgba(0,0,0,0.15);
overflow: hidden;
box-shadow:0 .5rem 1.5rem rgba(0,0,0,0.5);
margin-bottom: 10px;
`;

const Top = styled.View`
flex-direction: row;
`;

const CardImage = styled(Image)`
height: 100px;
width: 100px;
border-radius: 10px;
overflow: hidden;
`;

const CategoryImage = styled.Image`
height: 100px;
width: 100px;
border-radius: 10px;
overflow: hidden;
`;

const Wrapper = styled.View`
width: 75%;
padding: 0 6px;
`;


const Title = styled.Text`
font-size: 16px;
color: #444;
font-weight: 500;

`;

const BodyWrapper = styled.View`
margin-top: 6px;
`;


const Bottom = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-top: 8px;
`;

const Item = styled.View`
flex-direction: row;
align-items: center;
`;

const ItemValue = styled.Text`
font-size: 13px;
margin-left: 2px;
color: #444;
`;

const Avatar = styled(Image)`
height: 25px;
width: 25px;
border-radius: 50px;
overflow: hidden;
`;

const LocalAvatar = styled.Image`
height: 25px;
width: 25px;
border-radius: 50px;
border-width: 1px;
border-color: rgba(0,0,0,0.08);
overflow: hidden;
`;

const Username = styled.Text`
margin-left: 5px;
color: teal;
font-size: 13px;
`;
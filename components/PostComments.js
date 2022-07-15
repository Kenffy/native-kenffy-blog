import { View, Text } from 'react-native';
import React, {useState, useEffect} from 'react';
import styled from "styled-components/native";
import { Image } from 'react-native-expo-image-cache';
import { getAllCommentAsync } from '../services/firestoreServices';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PostComments({post}) {

  const defaultImg = require('../assets/images/noProfile.png');

  const [comments, setComments] = useState([]);

  useEffect(()=>{
    const loadComments = async()=>{
      try {
        const res = await getAllCommentAsync(post?.id);
        res && setComments(res);
      } catch (error) {
        console.log(error);
      }
    }
    post && loadComments();
  },[post?.id]);


  return (
    <Container>
      <InputWrapper>
      {post?.profile? 
        <Avatar 
        preview={{uri: post?.profile.url}}
        uri={post?.profile.url} />
        :
        <LocalAvatar source={defaultImg} />
        }
        <Input style={{textAlignVertical: 'top'}}
        multiline={true}
        numberOfLines={3}
        placeholder="write a comment..."/>
      </InputWrapper>
      <ButtonWrapper>
        <ButtonSave>
         <ButtonSaveText>Comment</ButtonSaveText>
        </ButtonSave>
        <ButtonClear>
         <ButtonClearText>Clear</ButtonClearText>
        </ButtonClear>
      </ButtonWrapper>

      <SubTitle>{post?.comments.length > 1 ? `${post?.comments.length} Comments`:`${post?.comments.length} Comment`}</SubTitle>
      <CommentWrapper>
        {comments.map(com=>(
        <Comment key={com?.id}>
            <CommentMoreBtn>
             <Ionicons name="ellipsis-vertical" size={18} style={{color: '#444'}}/>
            </CommentMoreBtn>
            {com?.profile? 
            <Avatar 
            style={{height: 30, width: 30}}
            preview={{uri: com?.profile.url}}
            uri={com?.profile.url} />
            :
            <LocalAvatar 
            style={{height: 30, width: 30}}
            source={defaultImg} />
            }
            <BodyWrapper>
                <CommentUser>{com?.username}</CommentUser>
                <CommentBody>{com?.body}</CommentBody>
                <Bottom>
                    <Item>
                        <Ionicons name="heart-outline" size={16} style={{color: 'teal'}}/>
                        <ItemValue>{post?.likes? post?.likes.length:0}</ItemValue>
                    </Item>
                </Bottom>
            </BodyWrapper>
        </Comment>
        ))}
      </CommentWrapper>
    </Container>
  )
};

const Container = styled.View`
margin-top: 15px;
`;

const SubTitle = styled.Text`
font-size: 18px;
font-weight: 600;
color: #444;
margin-top: 20px;
padding-bottom: 10px;
`;

const InputWrapper = styled.View`
flex-direction: row;
`;

const Avatar = styled(Image)`
height: 40px;
width: 40px;
border-radius: 50px;
`;

const LocalAvatar = styled.Image`
height: 40px;
width: 40px;
border-radius: 50px;
border-width: 1px;
border-color: rgba(0,0,0,0.08);
`;

const Input = styled.TextInput`
padding: 5px 10px;
margin-left: 10px;
width: 85%;
border-radius: 5px;
justify-content: flex-start;
border: 1px solid rgba(0,0,0,0.15);
`;

const ButtonWrapper = styled.View`
flex-direction: row;
justify-content: flex-end;
margin-top: 8px;
padding: 0 10px;
`;

const ButtonSave = styled.TouchableOpacity`
width: 85px;
padding: 8px 0;
border-radius: 3px;
background-color: teal;
`;

const ButtonClear = styled.TouchableOpacity`
width: 85px;
padding: 8px 0;
border-radius: 3px;
border-width: 1px;
border-color: teal;
margin-left: 10px;
`;

const ButtonSaveText = styled.Text`
text-align: center;
text-transform: uppercase;
font-size: 12px;
color: white;
font-weight: 500;
`;

const ButtonClearText = styled.Text`
text-align: center;
text-transform: uppercase;
font-size: 12px;
color: teal;
font-weight: 500;
`;

const CommentWrapper = styled.View`

`;

const Comment = styled.View`
flex-direction: row;
border-top-width: 1px;
padding: 10px 0;
position: relative;
border-color: rgba(0,0,0,0.15);
`;

const CommentUser = styled.Text`
font-weight: 500;
font-size: 15px;
color: #444;
`;

const BodyWrapper = styled.View`
margin-left: 10px;
width: 85%;
`;

const CommentBody = styled.Text`
font-size: 15px;
margin-top: 5px;
color: #444;
`;

const CommentMoreBtn = styled.TouchableOpacity`
position: absolute;
top: 3px;
right: 0;
height: 25px;
width: 25px;
justify-content: center;
align-items: flex-end;
`;

const Bottom = styled.View`
flex-direction: row;
align-items: center;
justify-content: flex-end;
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


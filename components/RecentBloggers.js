import { View, Text } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import styled from "styled-components/native";
import { getAllUsersAsync } from '../services/firestoreServices';
import UserCard from './UserCard';


export default class RecentBloggers extends Component {

    constructor(){
      super();
      this.state = {
        users: [],
        loading: false,
      }
    }
  
    UNSAFE_componentWillMount(){
      console.log('unsafe will mount')
    }
  
    componentDidMount(){
  
        const loadAllUsers = async()=>{
            this.setState({loading: true});
            const filter = {limit: 12,
                            lastVisible: null,}
            const res = await getAllUsersAsync(filter);
            if(res){
                this.setState({users: res.users});
                this.setState({loading: false});
              }
        }
        loadAllUsers();
    }
  
    render() {
      return (
        <Container>
          <Header>EXPLORE BLOGGERS</Header>
          {this.state.users.length > 0 &&
          <Wrapper>
          {this.state.users.map(user=>
          (<UserCard user={user} key={user?.id}/>)
          )}
          </Wrapper>
          }
          {this.state.loading &&
          <LoadingView>
            <LoadingText>Loading...</LoadingText>
          </LoadingView>
          }
          <MoreButton>
            <ButtonText>More Bloggers</ButtonText>
          </MoreButton>
        </Container>
      )
    }
  }


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
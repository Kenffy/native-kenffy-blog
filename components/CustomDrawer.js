import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const CustomDrawer = (props) =>{

    const user = true;

    const bg = require(`../assets/menu-bg.jpeg`);
    const userImage = require(`../assets/user-profile.jpg`);

    return (
        <Container>
            <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.wrapper}>
                <Header source={bg} resizeMode="cover">
                    {user?
                    <>
                    <ProfileImage source={userImage}/>
                    <Username>John Doe</Username>
                    <Email>johndoe@gmail.com</Email>
                    </>
                    :
                    <>
                    <Username>Hello, Welcome !</Username>
                    <Email>Please sign up to create, like and comment posts</Email>
                    </>
                    }
                    
                </Header>

                <DrawerItemWrapper>
                    <DrawerItemList {...props} />
                </DrawerItemWrapper>
            </DrawerContentScrollView> 
            {user &&
            <Others style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
        
                <TouchableOpacity onPress={() => {}}>
                    <LogoutWrapper>
                        <Ionicons name="log-out" size={22} style={{color: '#333'}}/>
                        <LogoutText>SIGN OUT</LogoutText>
                    </LogoutWrapper>
                </TouchableOpacity>
            </Others>}
        </Container>
    )
};

export default CustomDrawer;

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
    },
});

const Container = styled.View`
flex: 1;
`;

const Header = styled.ImageBackground`
padding: 20px 20px;
background-color: teal;
//background-image: linear-gradient(transparent, rgba(0,0,0,0.8)), url('');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;

const ProfileImage = styled.Image`
height: 160px;
width: 160px;
border-radius: 5px;
margin-bottom: 10px;
`;

const DrawerItemWrapper = styled.View`
flex: 1;
padding-top: 10px;
background-color: white;
`;

const Username = styled.Text`
font-size: 22px;
font-weight: 500;
color: white;
`;

const Email = styled.Text`
font-size: 14px;
font-weight: 300;
color: white;
`;

const Others = styled.View`
padding: 0px 20px;
padding-top: 20px;
padding-bottom: 50px;
`;

const LogoutWrapper = styled.View`
flex-direction: row;
align-items: center;
`;

const LogoutText = styled.Text`
font-size: 15px;
margin-left: 10px;
font-weight: 500;
color: #333;
`;
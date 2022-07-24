import React from 'react';
import { ScrollView, RefreshControl} from 'react-native';
import styled from "styled-components/native";
import CommonCategories from '../components/CommonCategories';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import RecentBloggers from '../components/RecentBloggers';
import RecentPosts from '../components/RecentPosts';
import { CategoryData } from '../seed/CategoryData';

export default function HomeScreen({navigation}) {

  const rootCategories = CategoryData.filter(c=>c.name !== "All" && c.name !== "Others");
  const startIndex = Math.floor(Math.random() * (rootCategories.length-8 - 1)) + 1;
  const categories =  rootCategories.slice(startIndex,startIndex+8);

  const onRefresh = () => {
    navigation.navigate('HOME');
  }
  
  return (
    <Container>
      <Navbar navigation={navigation}/>
      <ScrollView>
        <Header />
        <RecentPosts navigation={navigation}/>
        <RecentBloggers navigation={navigation} />
        <CommonCategories navigation={navigation} categories={categories}/>
      </ScrollView>
    </Container>
  )
};

const Container = styled.View`
    flex: 1;
`;

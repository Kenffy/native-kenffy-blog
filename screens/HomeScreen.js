import React from 'react';
import { ScrollView} from 'react-native';
import styled from "styled-components/native";
import CommonCategories from '../components/CommonCategories';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import RecentBloggers from '../components/RecentBloggers';
import RecentPosts from '../components/RecentPosts';
import { CategoryData } from '../seed/CategoryData';

export default function HomeScreen({navigation}) {

  const  categories =  CategoryData.slice(10,18);
  return (
    <Container>
      <Navbar navigation={navigation}/>
      <ScrollView>
        <Header />
        <RecentPosts />
        <RecentBloggers />
        <CommonCategories categories={categories}/>
      </ScrollView>
    </Container>
  )
};

const Container = styled.View`
    flex: 1;
`;

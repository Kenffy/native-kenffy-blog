import { View, Text } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import RecentPosts from '../components/RecentPosts';

export default function PostScreen() {
  return (
    <Container>
      <RecentPosts />
    </Container>
  )
};

const Container = styled.View`
    flex: 1;
`;
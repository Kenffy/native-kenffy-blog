
import styled from "styled-components/native";
import PostList from "./PostList";
import TopBar from "./TopBar";

export default function ExplorePosts({navigation}) {

  const title = 'Explore All Posts';

  return (
    <Container>
      <TopBar navigation={navigation} title={title} enableSearch={true}/>
      <PostList ishome={true} navigation={navigation}/>
    </Container>
  )
};

const Container = styled.View`
flex: 1;
`;
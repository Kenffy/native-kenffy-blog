import { View, Text } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import styled from "styled-components/native";
import { getAllPostsAsync } from '../services/firestoreServices';
import PostCard from './PostCard';

export default class RecentPosts extends Component {

  constructor(){
    super();
    this.state = {
      posts: [],
      loading: false,
    }
  }

  UNSAFE_componentWillMount(){
    console.log('unsafe will mount')
  }

  componentDidMount(){

    const loadAllPosts = async()=>{
      this.setState({loading: true});
      const filter = {category: "All", sort: "Date DESC", status: "Public", limit: 12}
      const res = await getAllPostsAsync(filter);
      if(res){
        this.setState({posts: res.posts});
        this.setState({loading: false});
      }
    }
    loadAllPosts();
  }

  render() {
    return (
      <Container>
        <Header>RECENTS POSTS</Header>
        {this.state.posts.length > 0 &&
        <View>
        {this.state.posts.map(post=>
        (<PostCard post={post} key={post?.id} />)
        )}
        </View>
        }
        {this.state.loading &&
        <LoadingView>
          <LoadingText>Loading...</LoadingText>
        </LoadingView>
        }
      </Container>
    )
  }
}







// export default function RecentPosts() {

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);

  

//   useEffect(()=>{
//     const loadAllPosts = async()=>{
//       setLoading(true);
//       const filter = {category: "All", sort: "Date DESC", status: "Public", limit: 12}
//       const res = await getAllPostsAsync(filter);
//       if(res){
//         setPosts(res.posts);
//         setLoading(false);
//       }
//     }
//     loadAllPosts();
//   },[]);


//   return (
//     <Container>
//       <Header>RECENTS POSTS</Header>
//       {posts.length > 0 &&
//       <View>
//         {posts.map(post=>
//           (<PostCard post={post} key={post?.id} />)
//         )}
//       </View>
//       }
//       {loading &&
//       <LoadingView>
//         <LoadingText>Loading...</LoadingText>
//       </LoadingView>
//       }
//     </Container>
//   )
// }

const Container = styled.View`
padding: 10px;
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


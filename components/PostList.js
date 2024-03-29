import React, { useCallback, useEffect, useState } from 'react'
import { CategoryData } from '../seed/CategoryData';
import styled from "styled-components/native";
import { getAllPostsAsync, getPostsByUserIdAsync } from '../services/firestoreServices';
import PostCard from './PostCard';
import CategoryFilter from './CategoryFilter';


export default function PostList({ishome, isprofile, userId, user, navigation}) {
    const status = [
        {"id": 1, "name": "Public", "value": "Public", "label": "Public"},
        {"id": 2, "name": "Friends", "value": "Friends", "label": "Friends"},
        {"id": 3, "name": "Private", "value": "Private", "label": "Private"}
      ];
    
      let sorts = [];
      if(ishome){
        sorts = [
          {"id": 1, "name": "Date ASC", "value": "Date ASC", "label": "Date ASC"},
          {"id": 2, "name": "Date DESC", "value": "Date DESC", "label": "Date DESC"}
        ];
      }else{
        sorts = [
          {"id": 1, "name": "Date ASC", "value": "Date ASC", "label": "Date ASC"},
          {"id": 2, "name": "Date DESC", "value": "Date DESC", "label": "Date DESC"},
          {"id": 3, "name": "Categories", "value": "Categories", "label": "Categories"}
        ];
      }
    
      const [currStatus, setCurrStatus] = useState(status[0]);
      const [currFilter, setCurrFilter] = useState(sorts[1]);
      const [expand, setExpand] = useState(false);
      const [posts, setPosts] = useState([]);
      const [hasMore, setHasMore] = useState(false);
      const [onFilter, setOnFilter] = useState(false);
      const [expandCat, setExpandCat] = useState(false);
      const [loading, setLoading] = useState(false);
      const [last, setLast] = useState(null);
      const [postSize, setPostSize] = useState(0);
      const [currCategory, setCurrCategory] = useState(CategoryData[0]);
    
    
      useEffect(()=>{
        const loadAllPosts = async()=>{
          console.log('use effect')
          setLoading(true);
          const filter = {category: currCategory?.name, sort: currFilter?.name, status: currStatus.name, lastVisible: null}
          let res = null;
          if(ishome){
            res = await getAllPostsAsync(filter);
          }
          if(isprofile){
            res = await getPostsByUserIdAsync(userId, user?.uid, filter);
          }
          if(res){
            setPosts(res.posts);
            setLast(res.lastVisible);
            setPostSize(res.size)
            setHasMore((res.posts.length < res.size));
            setLoading(false);
          }
          
        }
        loadAllPosts();
      },[ishome, isprofile, userId, user, currStatus, currFilter, currCategory]);
    
      const handleLoadMore = async()=>{
        console.log('load more')
        if (loading) return;
        if(posts.length === postSize) return;
        setLoading(true);
        const filter = {category: currCategory?.name, sort: currFilter?.name, status: currStatus.name, lastVisible: last, limit: 10}
    
        let res = null;
        if(ishome){
          res = await getAllPostsAsync(filter);
        }
        if(isprofile){
          res = await getPostsByUserIdAsync(userId, user?.uid, filter);
        }
        if(res){
          setPosts((prev)=>[...prev, ...res.posts]);
          setLast(res.lastVisible);
          setPostSize(res.size);
          setHasMore((res.posts.length < res.size));
          setLoading(false);
        }
      }

    const renderItem = ({ item }) => (
        <PostCard post={item} navigation={navigation}/>
    );

    const LoadinScreen = ()=>(
      <>
      {loading &&
        <LoadingView>
          <LoadingText>Please wait...</LoadingText>
        </LoadingView>
      }
      </>
    )

    console.log(posts?.length)

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 0;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };
    
  return (
    <Container>
      <CategoryFilter />
      <Wrapper
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          console.log('scroll view end reached.')
          if(posts.length < postSize){
            handleLoadMore();
          }
        }
      }}
      scrollEventThrottle={100}>

        {posts.length > 0 &&
        <PostWrapper>
          {posts.map(post=>
          (<PostCard post={post} key={post?.id} navigation={navigation}/>)
          )}
        </PostWrapper>
        }
        {loading &&
        <LoadingView>
          <LoadingText>Please wait...</LoadingText>
        </LoadingView>
        }
      </Wrapper>
      {/* <List
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        onScrollBeginDrag={()=>{stopLoadMore = false;}}
        ListFooterComponent={LoadinScreen}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
      /> */}
    </Container>
  )
};

const Container = styled.View`
flex: 1;
`;

const Wrapper = styled.ScrollView`
padding: 10px;
`;

const PostWrapper = styled.View`
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

const List = styled.FlatList`
padding: 10px;
padding-bottom: 10px;
`;
import { View, Text } from 'react-native'
import React from 'react'

export default function PostList() {
  
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
            setPosts([...posts, ...res.posts]);
            setLast(res.lastVisible);
            setHasMore((res.posts.length < res.size));
            setLoading(false);
        }
    }


  return (
    <View>
      <Text>PostList</Text>
    </View>
  )
}
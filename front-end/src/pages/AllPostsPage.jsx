import {useState, useEffect} from "react"
import axios from 'axios'
import { useOutletContext } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CommentItem from "../components/CommentItem"
import CardComponent from "../components/CardComponent";
import CreatePostItem from '../components/CreatePostItem'

const AllPostsPage = () => {
    const [posts, setPosts] = useState([])
    const {user} = useOutletContext()
    const [text, setText] = useState("")
    const [posterLang, setPosterLang] = useState("")
    const [translation, setTranslation] = useState([{}])
    const [postId, setPostId] = useState(null)
    
    let token = localStorage.getItem("token")
    
    const getAllPosts = async() => {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/posts/allposts/")
            .catch((err)=> {
                console.log(err.response)
            })
        setPosts(response.data)
    }
        
    const detectLanguage = async() => {
        if (translation.filter((obj) => obj.postId === postId).length !== 1) {
        let data = {
            "Text": text
        }
        let response = await axios
        .post("http://127.0.0.1:8000/api/v1/translate/detect/", data)
        .catch((err) =>{
            if (err.response.status === 429){
                alert('Basic users only get 3 translations a day')
            }
        })
        setPosterLang(response.data)
    }
    }
    
    const getTranslation = async() => {
        if (translation.filter((obj) => obj.postId === postId).length !== 1) {
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/translate/", {
                params: {
                    'from': posterLang,
                    'body': text
                }
            }) 
            .catch((err) =>{
                if (err.response.status === 429){
                    return
                }   
            })   
            setTranslation([
                ...translation,
                { postId: postId,
                    text: response.data}]
            )
        }
    }
    
    const onClickHandler = (info) => {
        const {post_content, id} = info
        setText(post_content)
        setPostId(id)
        detectLanguage()
    }
    
    useEffect(()=>{
        getAllPosts();
    },[])

    useEffect(()=> {
        getTranslation()
    },[text, postId])

    return(
        <>
        <CreatePostItem/>
            <div id='post-component'>
            {posts.map((post) => (
                <CardComponent key={post.id} id={post.id} className="post-card"
                post = {post}
                poster = {post.poster[0]}
                postContent = {post.post_content}
                languages = {`${post.poster[1].toUpperCase()} ➜ ${post.poster[2].toUpperCase()}`}
                translation = {translation.map((item) => (
                    item.postId === post.id ? item['text']: null
                    ))}
                onClickHandler = {onClickHandler}
                postId = {post.id}
                >
                </CardComponent>
            ))}
            </div>
        </>
    )
}

export default AllPostsPage
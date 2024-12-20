import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});
    const [outputValue, setOutputValue] = useState('');

    const handleChildOutput = (data) => {
        fetchPosts()
        setOutputValue(data);
        console.log(data)
      };

    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4002/posts");
        
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    var renderedPosts = Object.values(posts).map((post) => {
        return (
            <div
                className="card"
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} handleOutput={handleChildOutput}/>
                </div>
            </div>
        );
    });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

export default PostList;

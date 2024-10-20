import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
    const [comment, setComments] = useState({});

    const fetchComments = async () => {
        const res = await axios.get('http://localhost:5000/posts/' + postId + '/comments');

        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const renderedComments = Object.values(comment).map((comment) => {
        return (
            <li
                key={comment.id}
            >
                <h3>{comment.content} {comment.id}</h3>
            </li>
        );
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};

export default CommentList;

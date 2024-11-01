import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ comments }) => {
    const renderedComments = Object.values(comments).map((comment) => {
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

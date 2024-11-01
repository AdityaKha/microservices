import React, { useState } from 'react';
import axios from 'axios'

export default ({ postId , handleOutput }) => {
    const [comment, setComment] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('clicked ' + postId)
        await axios.post('http://localhost:5000/posts/' + postId + '/comments', {
            content: comment
        }).then((a, b) => {
            console.log(a, b)
        })

        setComment('')
        handleOutput('karde')
    }


    return <div>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>Comment {postId}</label>
                <div className="input-group mb-3">
                    <input value={comment} onChange={e => setComment(e.target.value)} type="text" className="form-control" placeholder="Recipient's username" />
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Add Comment</button>
                </div>
            </div>
        </form>
    </div>
};
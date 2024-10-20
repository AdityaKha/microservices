import React, { useState } from 'react';
import axios from 'axios'

export default () => {
  const [title, setTitle] = useState('')
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('clicked')
    await axios.post('http://localhost:4000/posts', {
      title
    }).then((a, b) => {
      console.log(a, b)
    })

    setTitle('')
  }


  return <div>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label>Title</label>
        <div class="input-group mb-3">
          <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" placeholder="Recipient's username" />
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Create Post</button>
        </div>
      </div>
    </form>
  </div>
};
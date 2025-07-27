import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

function CreatePost({ isAuth }) {

    //we need states to keep track of the title and post content
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");


    const postsCollectionRef = collection(db, "posts");
    const navigate = useNavigate();
    //we also need a function to handle the post submission
    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
        });
        navigate('/'); // Redirect to home after post creation
    };

    useEffect(() => { 
        if (!isAuth) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, []);


    return (
        <div className='createPostPage'>
            <div className='cpContainer'>
                <h1>Create A Post</h1>
                <div className='inputGp'>
                    <label>Title:</label>
                    <input type='text' placeholder='Title...' onChange={(event) => { setTitle(event.target.value) }} />
                </div>
                <div className='inputGp'>
                    <label>Post:</label>
                    <textarea placeholder='Post...' onChange={(event) => { setPostText(event.target.value) }} />
                </div>
                <button className='nav-button' onClick={createPost}> Submit Post </button>
            </div>
        </div>

    )
}

export default CreatePost;
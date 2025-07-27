import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';

function EditPost({ isAuth }) {

    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state || {};

    // Populate fields with post data
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setPostText(post.postText);
        }
    }, [post]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    // Handle update
    const updatePost = async () => {
        if (!post?.id) return; // Safety check
        try {
            const postDocRef = doc(db, 'posts', post.id);
            await updateDoc(postDocRef, {
                title,
                postText
            });
            navigate('/');
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className='createPostPage'>
            <div className='cpContainer'>
                <h1>Edit Post</h1>
                <div className='inputGp'>
                    <label>Title:</label>
                    <input
                        type='text'
                        placeholder='Title...'
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className='inputGp'>
                    <label>Post:</label>
                    <textarea
                        placeholder='Post...'
                        value={postText}
                        onChange={(event) => setPostText(event.target.value)}
                    />
                </div>
                <button
                    className='nav-button'
                    onClick={updatePost}
                >
                    Update
                </button>
            </div>
        </div>
    );
}

export default EditPost;

import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate, Navigate } from 'react-router-dom';

function Home({ isAuth }) {

    const [postLists, setPostsLists] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const Navigate = useNavigate();

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc)
    }

    // Function to handle editing a post
    const editPost = (post) => {
        Navigate('/edit', { state: { post } });
    }

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostsLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }

        getPosts();
    }, [deletePost]);


    return (
        <div className='homePage'>
            {postLists.map((post) => {
                return (
                    <div className='post'>
                        <div classsName='postHeader'>
                            <div className='title'>
                                <h3> {post.title} </h3>
                            </div>
                            <div className='deletePost'>
                                {isAuth && post.author.id === auth.currentUser.uid && (
                                    <button onClick={() => { deletePost(post.id) }}> &#128465;</button>
                                )}
                            </div>

                            <div className='editPost'>
                                {isAuth && post.author.id === auth.currentUser.uid && (
                                <button onClick={() => editPost(post)}> &#9998;</button>
                                )}
                            </div>

                        </div>
                        <div className='postText'>
                            {post.postText}
                        </div>
                        <h6>@ {post.author.name}</h6>

                    </div>
                )
            })}
        </div>
    )
}

export default Home;
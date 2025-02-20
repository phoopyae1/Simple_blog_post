import axios from 'axios';
import React, { createContext, useState } from 'react';

export const PostContext = createContext();

const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([]);
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    const addPost = async (post) => {
        try {
            const response = await axios.post('http://localhost:3000/api/posts', post);
            setPosts([...posts, response.data]);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };
    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/posts/${id}`);
            setPosts(posts.filter(post => post._id !== id)); // Remove the post from the state
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <PostContext.Provider value={{ posts, addPost, deletePost, fetchPosts }}>
                {children}
            </PostContext.Provider>
        </div>
    );
}

export default PostProvider;

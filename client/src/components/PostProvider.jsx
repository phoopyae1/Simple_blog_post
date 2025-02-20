import axios from "axios";
import { createContext, useState } from "react";
import { BASE_URL } from "../utils/constants";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all posts
  const getPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      setPosts(response.data);
      return response.data;
    } catch (error) {
      setError("Error fetching posts: " + error.message);
      console.error("Error fetching posts:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add new post
  const addPost = async (postData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/posts`, postData);
      setPosts([...posts, response.data]);
      return response.data;
    } catch (error) {
      setError("Error adding post: " + error.message);
      console.error("Error adding post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${BASE_URL}/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      setError("Error deleting post: " + error.message);
      console.error("Error deleting post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update post
  const updatePost = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BASE_URL}/posts/${id}`, updatedData);
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
      return response.data;
    } catch (error) {
      setError("Error updating post: " + error.message);
      console.error("Error updating post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Get single post
  const getPostById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/posts/${id}`);
      setPost(response.data);
      return response.data;
    } catch (error) {
      setError("Error fetching post: " + error.message);
      console.error("Error fetching post:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        post,
        loading,
        error,
        getPosts,
        addPost,
        deletePost,
        updatePost,
        getPostById,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

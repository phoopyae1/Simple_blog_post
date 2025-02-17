import React, { createContext, useState, useEffect, useContext } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const initialPosts = [
        {
            title: 'Post Title 1',
            author: 'Author Name 1',
            image: '/images/food.jpg',
            content: 'Homemade pizza is a delightful treat that can be customized with your favorite toppings. The key to a perfect pizza lies in the dough, which should be kneaded until smooth and elastic. Allowing the dough to rise in a warm place ensures a light and airy crust. Preheating the oven to a high temperature is crucial for achieving a crispy base. Experiment with different cheeses and fresh ingredients to create unique flavor combinations. Baking the pizza on a stone or baking sheet helps distribute heat evenly. Letting the pizza cool for a few minutes before slicing prevents the toppings from sliding off.'
        },
        {
            title: 'Post Title 2',
            author: 'Author Name 2',
            image: '/images/food.jpg',
            content: 'Homemade pizza is a delightful treat that can be customized with your favorite toppings. The key to a perfect pizza lies in the dough, which should be kneaded until smooth and elastic. Allowing the dough to rise in a warm place ensures a light and airy crust. Preheating the oven to a high temperature is crucial for achieving a crispy base. Experiment with different cheeses and fresh ingredients to create unique flavor combinations. Baking the pizza on a stone or baking sheet helps distribute heat evenly. Letting the pizza cool for a few minutes before slicing prevents the toppings from sliding off.'
        },
    ];

    const [posts, setPosts] = useState(initialPosts);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/DetailPage');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);
    const addPost = (post) => {
        setPosts([...posts, post]);
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/DetailPage');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);
    const deletePost = (id) => {
        setPosts(posts.filter(post => post._id !== id));
    };
    return (
        <PostContext.Provider value={{ posts, addPost, deletePost }}>
            {children}
        </PostContext.Provider>
    );
};

const Posts = () => {
    const { posts, deletePost } = useContext(PostContext);
    const history = useHistory();

    const handleLearnMore = (id) => {
        history.push(`/DetailPage/${id}`);
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/DetailPage/${id}`);
            deletePost(id); // Update state to remove the deleted post
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    return (
        <Container>
            <Grid container spacing={4}>
                {posts.map((post) => (
                    <Grid item key={post._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader title={post.title} subheader={post.author} />
                            <CardMedia component="img" image={post.image} alt={post.title} height="194" />
                            <CardContent>
                                <Typography variant="body2">
                                    {post.content.slice(0, 200)}...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleLearnMore(post._id)}>Learn More</Button>

                                <Button size="small" onClick={() => handleDelete(post._id)}>Delete</Button>


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Posts;
import React, { useContext, useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { PostContext } from './PostProvider';


const Posts = () => {
    const { posts, deletePost, fetchPosts } = useContext(PostContext);
    const history = useHistory();
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);
   
    const handleDelete = async (id) => {
        try {
            await deletePost(id); // Use deletePost from context
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    const handleLearnMore = (id) => {
        history.push(`/posts/${id}`);
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
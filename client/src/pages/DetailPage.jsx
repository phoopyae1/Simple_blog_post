import { Card, CardContent, CardHeader, CardMedia, Container, Typography } from '@material-ui/core';
import React, {  useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const DetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const post = posts[id];
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/DetailPage/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);
    if (!post) {
        return <Typography variant="h6">Post not found</Typography>;
    }

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    if (!post) {
        return <Typography>Post not found</Typography>;
    }


    return (
        <Container>
            <Card>
                <CardHeader title={post.title} subheader={post.author} />
                <CardMedia component="img" image={post.image} alt={post.title} height="194" />
                <CardContent>
                    <Typography variant="body2">
                        {post.content}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default DetailPage;
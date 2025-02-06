import { Card, CardContent, CardHeader, CardMedia, Container, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../components/Posts';

const DetailPage = () => {
    const { id } = useParams();
    const { posts } = useContext(PostContext);
    const post = posts[id];

    if (!post) {
        return <Typography variant="h6">Post not found</Typography>;
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
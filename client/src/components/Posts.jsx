import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { PostContext } from "./PostProvider";

const Posts = () => {
  const { posts, deletePost, getPosts, loading, error } =
    useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  const handleDelete = (id) => {
    deletePost(id);
  };

  if (loading) return <LoadingSpinner message="Loading posts..." />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!posts.length)
    return (
      <Container className="h-full">
        <Typography variant="h6">No posts found</Typography>
      </Container>
    );
  return (
    <Container>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} md={4}>
            <Card>
              <CardHeader title={post.title} subheader={post.author} />
              <CardMedia
                component="img"
                image={post.image}
                alt={post.title}
                height="194"
              />
              <CardContent>
                <Typography variant="body2">
                  {post.content.slice(0, 200)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => history.push(`/posts/${post._id}`)}
                >
                  Learn More
                </Button>
                <Button
                  size="small"
                  onClick={() => handleDelete(post._id)}
                  color="secondary"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;

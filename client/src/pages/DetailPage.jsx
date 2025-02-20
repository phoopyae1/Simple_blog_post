import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { PostContext } from "../components/PostProvider";

const DetailPage = () => {
  const { id } = useParams();
  const { getPostById, loading, error, post } = useContext(PostContext);

  useEffect(() => {
    if (!id) return;
    getPostById(id);
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading post..." />;
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <Typography variant="h6" align="center">
          Post not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Card elevation={3}>
        <CardHeader
          title={post.title}
          subheader={`Written by ${post.author}`}
          titleTypographyProps={{ variant: "h4" }}
          subheaderTypographyProps={{ variant: "subtitle1" }}
        />
        <CardMedia
          component="img"
          image={post.image}
          alt={post.title}
          height="400"
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            variant="body1"
            component="div"
            style={{ whiteSpace: "pre-line" }}
          >
            {post.content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DetailPage;

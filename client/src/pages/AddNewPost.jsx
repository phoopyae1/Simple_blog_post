import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  TextField,
} from "@material-ui/core";
import { Textarea } from "@mui/joy";
import { useFormik } from "formik";
import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../components/PostProvider";
import { basicSchema } from "../schemas";

const AddNewPost = () => {
  const { addPost } = useContext(PostContext);
  const history = useHistory();

  const handleAddNewPost = useCallback(() => {
    history.push("/");
  }, [history]);

  const handleImageConversion = async (file) => {
    const reader = new FileReader();

    // Start reading the file
    reader.readAsDataURL(file);

    // Wait for either success or error
    await new Promise((resolve, reject) => {
      reader.onload = resolve;
      reader.onerror = reject;
    });

    return reader.result;
  };

  const handleSubmit = async (values, actions) => {
    try {
      const imageBase64 = await handleImageConversion(values.image);
      const postData = { ...values, image: imageBase64 };

      await addPost(postData);
      actions.resetForm();
      handleAddNewPost();
    } catch (error) {
      actions.setStatus({
        error: "Failed to create post. Please try again.",
      });
      console.error("Error creating post:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      image: null,
      content: "",
    },
    validationSchema: basicSchema,
    onSubmit: handleSubmit,
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    setFieldValue,
  } = formik;

  return (
    <Container maxWidth="sm">
      <form onSubmit={formik.handleSubmit}>
        <Card sx={{ padding: 2, marginTop: 4 }}>
          <CardHeader title="Add New Post" />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <TextField
                id="author"
                label="Author"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.author}
                error={touched.author && Boolean(errors.author)}
                helperText={touched.author && errors.author}
              />
              <TextField
                id="image"
                name="image"
                type="file"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0];
                  if (file) setFieldValue("image", file);
                }}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {touched.image && errors.image && (
                <div style={{ color: "red" }}>{errors.image}</div>
              )}
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                minRows={3}
                variant="outlined"
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                error={touched.content && Boolean(errors.content)}
                sx={{ marginBottom: 3, marginTop: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
};

export default AddNewPost;

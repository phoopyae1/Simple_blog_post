import { Box, Button, Card, CardContent, CardHeader, Container, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useContext } from 'react'; // Import useContext
import { basicSchema } from '../schemas';
import { Textarea } from '@mui/joy';
import { PostContext } from '../components/Posts'; // Import PostContext
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const onSubmit = async (values, actions, addPost, handleAddNewPost) => {
  console.log(values);
  const reader = new FileReader();
  reader.readAsDataURL(values.image);
  reader.onloadend = () => {
    values.image = reader.result;
    addPost(values);
    actions.resetForm();
    handleAddNewPost();
  };
};

const AddNewPost = () => {
  const { addPost } = useContext(PostContext);
  const history = useHistory();

  const handleAddNewPost = () => {
    history.push('/');
  };
  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      title: '',
      author: '',
      image: null,
      content: '',
    },
    validationSchema: basicSchema,
    onSubmit: (values, actions) => onSubmit(values, actions, addPost,handleAddNewPost),
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Card sx={{ padding: 2, marginTop: 4 }}>
          <CardHeader title="Add New Post" />
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {touched.image && errors.image && (
                <div style={{ color: 'red' }}>{errors.image}</div>
              )}
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                minRows={3}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                error={touched.content && Boolean(errors.content)}
                helperText={touched.content && errors.content}
                sx={{ marginBottom: 3, marginTop: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} >
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
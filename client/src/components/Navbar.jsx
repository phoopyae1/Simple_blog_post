import { Box, Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Navbar = () => {
    const history = useHistory();

    return (
        <Container>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <Typography variant="h6 bold" component="h1" >
                    Blog Posts
                </Typography>
                <Button variant="contained" color="primary" onClick={() => history.push('/posts/new')}>
                    Add New Post
                </Button>
            </Box>

        </Container>
    );
}

export default Navbar;

import React from 'react';
import { Box, Button, Container, Typography } from '@material-ui/core';
const Navbar = () => {
    return (
        <Container>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                <Typography variant="h6 bold" component="h1" >
                    Blog Posts
                </Typography>
                <Button variant="contained" color="primary">Add New Post</Button>
            </Box>

        </Container>
    );
}

export default Navbar;

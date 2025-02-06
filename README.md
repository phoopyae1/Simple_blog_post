### Starter Project for the Material UI playlist
# React Blog Post App

Simple blog application built with React and Material-UI. Features post creation with Formik validation, post listing, and detailed post views.

## Setup
Install dependencies:
`npm install @material-ui/core formik react-router-dom yup`

Start development:
`npm start`

## Features
- Post listing with Material-UI cards
- Post detail view with routing
- Form validation using Formik
- Context API for state management

## Structure
Main components: Posts, DetailPage, CreatePost
Routes: Home (/), Detail (/DetailPage/:id), AddNewPost (/AddNewPost)

## Validation
Posts require title , author name, and content ,image not bigger than 100KB

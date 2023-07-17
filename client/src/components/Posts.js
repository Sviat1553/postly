import React, { useEffect, useState } from "react";
import Post from "./Post";
import { TextField, Button, Typography, Box } from "@mui/material";
import Container from '@mui/material/Container';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/posts");
    const data = await response.json();
    setPosts(data);
  };

  const createPost = async (e) => {
    e.preventDefault();
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, content: newContent, author: newAuthor }),
    });
    const data = await response.json();
    setPosts([data, ...posts]);
    setNewTitle("");
    setNewContent("");
    setNewAuthor("");
  };

  const updatePost = async (id, title, content, author) => {
    const response = await fetch(`/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, author }),
    });
    const data = await response.json();
    setPosts(posts.map((post) => (post._id === id ? data : post)));
  };

  const deletePost = async (id) => {
    const response = await fetch(`/posts/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Posts</Typography>
      <Box component="form" onSubmit={createPost} sx={{ mb: 4 }}>
        <TextField
          label="Author"
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          fullWidth
          variant="outlined"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Title"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          fullWidth
          variant="outlined"
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          fullWidth
          variant="outlined"
          required
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Add New Post</Button>
      </Box>
      {posts.map((post) => (
        <Post key={post._id} post={post} editPost={updatePost} deletePost={deletePost} />
      ))}
    </Container>
  );
}

export default Posts;
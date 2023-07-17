import React, { useState } from "react";
import { TextField, Button, Box, Card, CardContent, Typography } from "@mui/material";

function Post({ post, editPost, deletePost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [author, setAuthor] = useState(post.author);

  const handleSave = () => {
    editPost(post._id, title, content, author);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box component="form" sx={{ mb: 3 }}>
            <TextField
              label="Author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              fullWidth
              variant="outlined"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              variant="outlined"
              required
              sx={{ mb: 2 }}
            />
            <Button onClick={handleSave} variant="contained" sx={{ mr: 1 }}>Save</Button>
            <Button onClick={() => setIsEditing(false)} variant="contained">Cancel</Button>
          </Box>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{author}</Typography>
          <Typography variant="body1">{content}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button onClick={() => setIsEditing(true)} variant="contained" sx={{ mr: 1 }}>Edit</Button>
            <Button onClick={() => deletePost(post._id)} variant="contained">Delete</Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default Post;
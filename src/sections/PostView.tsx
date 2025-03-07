"use client";

import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { fetchPosts } from "@/app/actions/posts";

interface Post {
  id: string;
  userId: string;
  imageUrl: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string | null;
  };
}

const PostsView = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts: Post[] = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    loadPosts();
  }, []);

  return (
    <Container sx={{ mt: 4, pb: 10 }}> {/* Added bottom padding */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Príspevky
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={8} md={6} lg={5} key={post.id}>
            <Card sx={{ width: "100%", borderRadius: 2, boxShadow: 3, p: 2, mb: 3 }}>
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                  maxHeight: 500,
                  objectFit: "contain",
                  borderRadius: "8px 8px 0 0",
                }}
                image={post.imageUrl}
                alt={post.caption || "Príspevok bez popisu"}
              />
              <CardContent>
                <Typography variant="body1">{post.caption || "Bez popisu"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.user.name || "Neznámy používateľ"}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton>
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsView;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { BlogItem, useBlogStore } from "@/store/blogStore";
import {
  BLOG_FIELD_LIMITS,
  BlogFieldErrors,
  validateBlogInput,
} from "@/lib/blog-input";

const CreateBlog: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState<BlogFieldErrors>({});
  const router = useRouter();
  const { addBlog } = useBlogStore();

  const handleAddBlog = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateBlogInput({
      author,
      title,
      description,
      imageUrl,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newBlog: BlogItem = {
      id: crypto.randomUUID(),
      author: author.trim(),
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      date: new Date().toLocaleDateString(),
    };
    addBlog(newBlog);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-200 sm:p-8">
        <h1 className="text-2xl font-semibold text-stone-900">New post</h1>

        <form onSubmit={handleAddBlog} className="mt-6 flex flex-col gap-5" noValidate>
          <TextField
            id="author"
            label="Author"
            value={author}
            fullWidth
            error={Boolean(errors.author)}
            helperText={errors.author}
            onChange={(event) => setAuthor(event.target.value)}
            slotProps={{ htmlInput: { maxLength: BLOG_FIELD_LIMITS.author } }}
          />
          <TextField
            id="title"
            label="Title"
            value={title}
            fullWidth
            error={Boolean(errors.title)}
            helperText={errors.title}
            onChange={(event) => setTitle(event.target.value)}
            slotProps={{ htmlInput: { maxLength: BLOG_FIELD_LIMITS.title } }}
          />
          <TextField
            id="description"
            label="Description"
            value={description}
            fullWidth
            multiline
            minRows={4}
            error={Boolean(errors.description)}
            helperText={errors.description}
            onChange={(event) => setDescription(event.target.value)}
            slotProps={{
              htmlInput: { maxLength: BLOG_FIELD_LIMITS.description },
            }}
          />
          <TextField
            id="image-url"
            label="Image URL"
            value={imageUrl}
            fullWidth
            placeholder="https://picsum.photos/id/237/800/600"
            error={Boolean(errors.imageUrl)}
            helperText={
              errors.imageUrl ??
              "Use an https link on picsum.photos or fastly.picsum.photos."
            }
            onChange={(event) => setImageUrl(event.target.value)}
            slotProps={{ htmlInput: { maxLength: BLOG_FIELD_LIMITS.imageUrl } }}
          />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              component={Link}
              href="/"
              color="inherit"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Publish post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

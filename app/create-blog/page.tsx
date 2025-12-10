"use client";

import React, { useState } from "react";
import { BlogItem, useBlogStore } from "@/app/store/blogStore";
import { useRouter } from "next/navigation";

const CreateBlog: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter(); // Initialize router
  const { addBlog } = useBlogStore();

  const handleAddBlog = () => {
    const newBlog: BlogItem = {
      id: crypto.randomUUID(),
      author,
      title,
      description,
      imageUrl,
      date: new Date().toLocaleDateString(),
    };
    addBlog(newBlog);

    // Clear form
    setAuthor("");
    setTitle("");
    setDescription("");
    setImageUrl("");

    // Navigate back to home page
    router.push("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg border border-gray-50 shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a New Blog</h1>

      <div className="flex flex-col space-y-4">
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
        />
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddBlog}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;

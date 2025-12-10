"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useBlogStore } from "@/app/store/blogStore";

const BlogDetails: React.FC = () => {
  const params = useParams();
  const id = params.id; // ← App Router gives string
  const blogs = useBlogStore((state) => state.blogs);
  const selectedBlog = blogs.find((b) => b.id === id);

  if (!selectedBlog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-50 rounded-lg shadow-sm">
      <div className="relative w-full h-64 md:h-80">
        <Image
          src={selectedBlog.imageUrl}
          alt={selectedBlog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>
        <p className="text-gray-700 mb-4">{selectedBlog.description}</p>
        <div className="flex justify-between text-gray-500 text-sm">
          <span>Author: {selectedBlog.author}</span>
          <span>Date: {selectedBlog.date}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import { useBlogStore } from "@/app/store/blogStore";

const BlogList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { blogs, deleteBlog } = useBlogStore();
  const router = useRouter();

  const filteredData = searchQuery
    ? blogs.filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : blogs;
console.log(blogs)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search */}
      <input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Blog Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item) => (
          <div
            key={item.id}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition hover:scale-[1.02]"
            onClick={() => router.push(`/blog/${item.id}`)}
          >
            {/* Trash Icon */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log(item.id)
                deleteBlog(item.id);
              }}
              className="absolute top-2 right-2 z-20 text-red-500 opacity-0 group-hover:opacity-100 transition-colors duration-200 hover:text-red-700 cursor-pointer"
            >
              <FiTrash2 size={20} />
            </button>

            {/* Image */}
            <div className="relative w-full h-48">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{item.title}</h2>
              <p className="text-gray-700 mb-4">
                {item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {item.author}</span>
                <span>{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useBlogStore } from "@/store/blogStore";
import { isAllowedImageUrl } from "@/lib/blog-input";

const BlogDetails: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const blogs = useBlogStore((state) => state.blogs);
  const hasHydrated = useBlogStore((state) => state.hasHydrated);
  const selectedBlog = blogs.find((blog) => blog.id === id);

  if (!selectedBlog) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-lg text-stone-700">
          {hasHydrated ? "This post could not be found." : "Loading..."}
        </p>
        {hasHydrated && (
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Back to posts
          </Link>
        )}
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4">
      <Link
        href="/"
        className="text-sm font-medium text-blue-700 hover:text-blue-800"
      >
        Back to posts
      </Link>
      <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200">
        <div className="relative h-64 w-full bg-stone-100 md:h-80">
          {isAllowedImageUrl(selectedBlog.imageUrl) && (
            <Image
              src={selectedBlog.imageUrl}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-stone-900">{selectedBlog.title}</h1>
          <p className="mt-3 text-sm text-stone-500">
            By {selectedBlog.author}
            <span aria-hidden="true"> · </span>
            <span>{selectedBlog.date}</span>
          </p>
          <p className="mt-6 whitespace-pre-wrap text-stone-700">
            {selectedBlog.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default BlogDetails;

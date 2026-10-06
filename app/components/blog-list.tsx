"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from "react-icons/fi";
import { useBlogStore } from "@/app/store/blogStore";
import { isAllowedImageUrl } from "@/app/lib/blog-input";
import DeleteBlogDialog from "@/app/components/delete-blog-dialog";

const BlogList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const { blogs, deleteBlog, hasHydrated } = useBlogStore();

  const searchDisabled = blogs.length === 0;
  const pendingBlog = blogs.find((blog) => blog.id === pendingDeleteId) ?? null;

  const confirmDelete = () => {
    if (!pendingBlog) return;
    if (blogs.length === 1) setSearchQuery("");
    deleteBlog(pendingBlog.id);
    setPendingDeleteId(null);
  };

  const filteredData = searchQuery
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : blogs;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-row items-center justify-between gap-4">
        <div className="shrink-0">
          <h1 className="text-2xl font-semibold text-stone-900">Posts</h1>
          {!hasHydrated && (
            <p className="mt-1 text-sm text-stone-500">Loading your posts...</p>
          )}
        </div>
        <div className="relative w-80 max-w-[60%] shrink-0 sm:w-96">
          <label htmlFor="post-search" className="sr-only">
            Search posts
          </label>
          <input
            id="post-search"
            type="search"
            placeholder={searchDisabled ? "Search is available after you add a post" : "Search by title"}
            value={searchQuery}
            disabled={searchDisabled}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setPendingDeleteId(null);
            }}
            className="w-full rounded-md border border-stone-300 bg-white px-4 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
          />
        </div>
      </div>

      {hasHydrated && filteredData.length === 0 && (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
          <h2 className="text-lg font-medium text-stone-900">
            {searchQuery ? "No posts match that title." : "No posts yet."}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">
            {searchQuery
              ? "Try a different title, or clear the search."
              : "Write your first post."}
          </p>
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-5 rounded-md border border-stone-300 px-4 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
            >
              Clear search
            </button>
          ) : (
            <Link
              href="/create-blog"
              className="mt-5 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              New post
            </Link>
          )}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-stone-200 transition duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg"
          >
            <button
              type="button"
              aria-label={`Delete ${item.title}`}
              onClick={() => setPendingDeleteId(item.id)}
              className="absolute top-3 right-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-red-600 opacity-0 shadow ring-1 ring-stone-200 transition-opacity pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 hover:bg-red-50"
            >
              <FiTrash2 size={16} aria-hidden="true" />
            </button>

            <Link href={`/blog/${item.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="relative h-48 w-full bg-stone-100">
                {isAllowedImageUrl(item.imageUrl) && (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 ease-out motion-safe:group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="line-clamp-2 text-lg font-semibold text-stone-900">
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm text-stone-600">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-stone-500">
                  <span>By {item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {pendingBlog && (
        <DeleteBlogDialog
          title={pendingBlog.title}
          onCancel={() => setPendingDeleteId(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default BlogList;

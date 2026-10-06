"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogItem, useBlogStore } from "@/store/blogStore";
import {
  BLOG_FIELD_LIMITS,
  BlogFieldErrors,
  validateBlogInput,
} from "@/lib/blog-input";

const fieldClass =
  "mt-1 w-full rounded-md border border-stone-300 px-4 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-blue-500";

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

        <form onSubmit={handleAddBlog} className="mt-6 space-y-5" noValidate>
          <div>
            <label htmlFor="author" className="text-sm font-medium text-stone-800">
              Author
            </label>
            <input
              id="author"
              value={author}
              maxLength={BLOG_FIELD_LIMITS.author}
              onChange={(event) => setAuthor(event.target.value)}
              aria-invalid={Boolean(errors.author)}
              aria-describedby={errors.author ? "author-error" : undefined}
              className={fieldClass}
            />
            {errors.author && (
              <p id="author-error" className="mt-1 text-sm text-red-600">
                {errors.author}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="title" className="text-sm font-medium text-stone-800">
              Title
            </label>
            <input
              id="title"
              value={title}
              maxLength={BLOG_FIELD_LIMITS.title}
              onChange={(event) => setTitle(event.target.value)}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={fieldClass}
            />
            {errors.title && (
              <p id="title-error" className="mt-1 text-sm text-red-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-medium text-stone-800">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              maxLength={BLOG_FIELD_LIMITS.description}
              onChange={(event) => setDescription(event.target.value)}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? "description-error" : undefined}
              className={`${fieldClass} h-32 resize-y`}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-sm text-red-600">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="image-url" className="text-sm font-medium text-stone-800">
              Image URL
            </label>
            <input
              id="image-url"
              value={imageUrl}
              maxLength={BLOG_FIELD_LIMITS.imageUrl}
              placeholder="https://picsum.photos/id/237/800/600"
              onChange={(event) => setImageUrl(event.target.value)}
              aria-invalid={Boolean(errors.imageUrl)}
              aria-describedby="image-url-hint"
              className={fieldClass}
            />
            <p
              id="image-url-hint"
              className={`mt-1 text-sm ${errors.imageUrl ? "text-red-600" : "text-stone-500"}`}
            >
              {errors.imageUrl ??
                "Use an https link on picsum.photos or fastly.picsum.photos."}
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/"
              className="rounded-md px-4 py-2 text-center text-sm font-medium text-stone-700 hover:bg-stone-100"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Publish post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

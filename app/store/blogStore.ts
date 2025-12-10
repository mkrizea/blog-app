import { create } from "zustand";

// --- Blog item type ---
export interface BlogItem {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
}

// --- Zustand store ---
interface BlogState {
  blogs: BlogItem[];
  addBlog: (blog: BlogItem) => void;
  deleteBlog: (id: string) => void;
  setBlogs: (blogs: BlogItem[]) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  addBlog: (blog) =>
    set((state) => ({ blogs: [...state.blogs, blog] })),
  deleteBlog: (id) =>
    set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) })),
  setBlogs: (blogs) => set({ blogs }),
}));

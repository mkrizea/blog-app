import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BlogItem {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  imageUrl: string;
}

interface BlogState {
  blogs: BlogItem[];
  hasHydrated: boolean;
  addBlog: (blog: BlogItem) => void;
  deleteBlog: (id: string) => void;
  setBlogs: (blogs: BlogItem[]) => void;
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set) => ({
      blogs: [],
      hasHydrated: false,
      addBlog: (blog) =>
        set((state) => ({ blogs: [...state.blogs, blog] })),
      deleteBlog: (id) =>
        set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) })),
      setBlogs: (blogs) => set({ blogs }),
    }),
    {
      name: "blog-app-posts",
      skipHydration: true,
      partialize: (state) => ({ blogs: state.blogs }),
      onRehydrateStorage: () => () => {
        useBlogStore.setState({ hasHydrated: true });
      },
    },
  ),
);

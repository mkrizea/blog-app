"use client";

import { useEffect } from "react";
import { useBlogStore } from "@/store/blogStore";

const BlogStoreHydration = () => {
  useEffect(() => {
    void useBlogStore.persist.rehydrate();
  }, []);

  return null;
};

export default BlogStoreHydration;

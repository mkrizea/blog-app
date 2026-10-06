const ALLOWED_IMAGE_HOSTS = new Set(["fastly.picsum.photos", "picsum.photos"]);

export const BLOG_FIELD_LIMITS = {
  author: 80,
  title: 120,
  description: 2000,
  imageUrl: 2048,
} as const;

export function isAllowedImageUrl(value: string): boolean {
  if (!value || value.length > BLOG_FIELD_LIMITS.imageUrl) return false;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  return (
    url.protocol === "https:" &&
    !url.username &&
    !url.password &&
    !url.port &&
    ALLOWED_IMAGE_HOSTS.has(url.hostname)
  );
}

export type BlogFieldErrors = Partial<
  Record<"author" | "title" | "description" | "imageUrl", string>
>;

export function validateBlogInput(input: {
  author: string;
  title: string;
  description: string;
  imageUrl: string;
}): BlogFieldErrors {
  const errors: BlogFieldErrors = {};
  const author = input.author.trim();
  const title = input.title.trim();
  const description = input.description.trim();
  const imageUrl = input.imageUrl.trim();

  if (!author) errors.author = "Add an author.";
  else if (author.length > BLOG_FIELD_LIMITS.author) {
    errors.author = `Use ${BLOG_FIELD_LIMITS.author} characters or fewer.`;
  }

  if (!title) errors.title = "Add a title.";
  else if (title.length > BLOG_FIELD_LIMITS.title) {
    errors.title = `Use ${BLOG_FIELD_LIMITS.title} characters or fewer.`;
  }

  if (!description) errors.description = "Add a description.";
  else if (description.length > BLOG_FIELD_LIMITS.description) {
    errors.description = `Use ${BLOG_FIELD_LIMITS.description} characters or fewer.`;
  }

  if (!imageUrl) errors.imageUrl = "Add an image URL.";
  else if (!isAllowedImageUrl(imageUrl)) {
    errors.imageUrl =
      "Use an https link on picsum.photos or fastly.picsum.photos.";
  }

  return errors;
}

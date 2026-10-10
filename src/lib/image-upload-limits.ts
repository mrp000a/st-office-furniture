export const USER_IMAGE_MAX_SIZE = 1 * 1024 * 1024;
export const OTHER_IMAGE_MAX_SIZE = 2 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function getImageUploadMaxSize(path: string) {
  return path.includes("/users/") ? USER_IMAGE_MAX_SIZE : OTHER_IMAGE_MAX_SIZE;
}

export function validateImageFile(file: File, path: string) {
  const maxSize = getImageUploadMaxSize(path);

  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return "Image must be JPG, PNG, or WebP.";
  }

  if (file.size === 0) {
    return "Image file cannot be empty.";
  }

  if (file.size > maxSize) {
    return `Image must be ${maxSize / (1024 * 1024)} MB or smaller.`;
  }

  return undefined;
}

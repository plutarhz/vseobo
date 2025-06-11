import Image from "next/image";

type PostThumbnailProps = {
  src?: string;
  alt?: string;
};

export function PostThumbnail({ src, alt }: PostThumbnailProps) {
  if (!src) {
    return (
      <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
        <span className="text-xs text-gray-500">No Image</span>
      </div>
    );
  }

  return (
    <div className="w-20 h-20 relative rounded overflow-hidden">
      <Image
        src={src}
        alt={alt || "Post thumbnail"}
       
        width={80}
        height={80}
        className="object-cover"
      />
    </div>
  );
}
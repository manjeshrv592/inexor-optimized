import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPostsForNavigation, getBlogPosts } from "@/lib/sanity/blog";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils/textUtils";
import LazyImage from "@/components/ui/LazyImage";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const blogPosts = await getBlogPosts();
    
    return blogPosts.map((post) => ({
      slug: post.slug.current,
    }));
  } catch (error) {
    console.error('Error generating blog post static params:', error);
    return [];
  }
}

const page = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const [blogPost, allBlogPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPostsForNavigation(),
  ]);

  if (!blogPost) {
    notFound();
  }

  // Find current index for navigation
  const currentIndex = allBlogPosts.findIndex(
    (post) => post.slug.current === slug,
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allBlogPosts.length - 1;
  const prevPost = hasPrev ? allBlogPosts[currentIndex - 1] : null;
  const nextPost = hasNext ? allBlogPosts[currentIndex + 1] : null;

  return (
    <div className="h-[calc(100dvh-237px)] overflow-y-auto bg-neutral-900 xl:h-full">
        <div className="text-sm text-neutral-100">
          {/* Title */}
          <h3 className="font-michroma my-4 text-center text-xl text-white">
            {blogPost.title}
          </h3>

          {/* Featured Image */}
          <div className="xxl:h-[300px] relative h-[200px]">
            <div className="absolute top-0 left-0 size-full bg-black">
              <LazyImage
                src={blogPost.featuredImage || "/img/left-image.jpg"}
                alt={blogPost.featuredImage?.alt || blogPost.title}
                fill
                className="object-cover grayscale"
                priority={true}
                mimeType={blogPost.featuredImage?.asset?.mimeType}
                lqip={blogPost.featuredImage?.asset?.metadata?.lqip}
              />
            </div>
          </div>

          {/* Author and Date */}
          <div className="mb-4 flex items-center justify-between border-b-2 border-neutral-200 p-2 xl:px-12">
            <div className="flex items-center gap-2 lg:gap-4">
              {blogPost.author && (
                <>
                  <span className="inline-block size-10 overflow-hidden rounded-full bg-neutral-700">
                    {blogPost.author.image ? (
                      <LazyImage
                        src={blogPost.author.image}
                        alt={blogPost.author.name}
                        width={40}
                        height={40}
                        className="size-full object-cover"
                        sizes="40px"
                        priority={false}
                        mimeType={blogPost.author.image.asset?.mimeType}
                        lqip={blogPost.author.image.asset?.metadata?.lqip}
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-sm text-white">
                        {blogPost.author.name.charAt(0)}
                      </div>
                    )}
                  </span>
                  <span className="font-michroma text-xs">
                    {blogPost.author.name.toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-col items-end gap-2 text-[10px] text-neutral-400 lg:flex-row lg:items-center lg:gap-4">
              <span className="font-michroma hidden lg:block">
                {new Date(blogPost.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="font-michroma lg:hidden">
                {new Date(blogPost.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              {blogPost.readingTime && (
                <span className="font-michroma">
                  {blogPost.readingTime} min read
                </span>
              )}
            </div>
          </div>

          {/* Blog Content */}
          <div className="px-2">
            {blogPost.content && (
              <PortableTextRenderer content={blogPost.content} />
            )}
          </div>

          {/* Navigation Footer */}
          <footer className="mt-8 flex justify-between gap-4 border-t-2 border-neutral-300 px-2 pt-6 pb-4 md:flex-row">
            <div className="flex flex-col">
              {hasPrev && prevPost ? (
                <>
                  <Link href={`/resources/blogs/${prevPost.slug.current}`}>
                    <Button
                      className="font-michroma text-[10px] tracking-[1px]"
                      variant={"outline"}
                      size={"sm"}
                    >
                      <span className="flex gap-2">
                        <ArrowLeft size={16} /> Prev Blog
                      </span>
                    </Button>
                  </Link>
                  <p className="mt-2 text-xs xl:hidden">
                    {truncateText(prevPost.title, 25)}
                  </p>
                  <p className="mt-2 hidden text-xs xl:block">
                    {truncateText(prevPost.title, 50)}
                  </p>
                </>
              ) : (
                <div></div>
              )}
            </div>
            <div className="flex flex-col items-end">
              {hasNext && nextPost ? (
                <>
                  <Link href={`/resources/blogs/${nextPost.slug.current}`}>
                    <Button
                      className="font-michroma text-[10px] tracking-[1px]"
                      variant={"outline"}
                      size={"sm"}
                    >
                      <span className="flex gap-2">
                        Next Blog <ArrowRight size={16} />
                      </span>
                    </Button>
                  </Link>
                  <p className="mt-2 text-xs xl:hidden">
                    {truncateText(nextPost.title, 25)}
                  </p>
                  <p className="mt-2 hidden text-xs xl:block">
                    {truncateText(nextPost.title, 50)}
                  </p>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </footer>
        </div>
      </div>
  );
};

export default page;

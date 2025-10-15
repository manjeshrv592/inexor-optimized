import React from "react";
import { Button } from "@/components/ui/button";
import { getResourcesPage } from "@/lib/sanity";
import LazyImage from "@/components/ui/LazyImage";

const ResourcesPage = async () => {
  // Fetch resources page data from Sanity
  const resourcesPageData = await getResourcesPage();

  return (
    <div
      className="h-full xl:grid xl:h-full xl:grid-cols-[150px_250px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel */}
      <div className="relative xl:h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5 px-5 py-7">
          {/* Mobile button */}
          <Button
            size={"sm"}
            className="font-michroma w-20 text-[10px] tracking-[1px] xl:hidden xl:w-full"
            variant={"default"}
          >
            Blogs
          </Button>
          {/* Desktop button */}
          <Button
            className="font-michroma hidden w-20 text-[10px] tracking-[1px] lg:w-full xl:block"
            variant={"default"}
          >
            Blogs
          </Button>
        </div>
        <div className="absolute top-0 left-0 size-full">
            {/* Background image will be loaded from Sanity */}
            <LazyImage
              src={
                resourcesPageData?.leftPanelBackgroundImage ||
                "/img/left-image.jpg"
              }
              alt={resourcesPageData?.leftPanelBackgroundImage?.alt || "blog bg"}
              fill
              className="object-cover grayscale"
              priority={true}
              mimeType={resourcesPageData?.leftPanelBackgroundImage?.asset?.mimeType}
              lqip={resourcesPageData?.leftPanelBackgroundImage?.asset?.metadata?.lqip}
            />
          </div>
      </div>

      {/* Middle Panel - Blog List */}
      <div className="h-[calc(100dvh-237px)] overflow-y-auto bg-neutral-800 xl:h-full">
        <div className="p-4">
          <h2 className="font-michroma mb-4 text-center text-sm text-white">
            {resourcesPageData?.blogSectionTitle || "LATEST BLOGS"}
          </h2>
          <div className="space-y-3">
            {/* Placeholder blog list items */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="cursor-pointer border-b border-neutral-600 pb-3 hover:bg-neutral-700 p-2 rounded"
              >
                <h3 className="text-xs text-white mb-1">
                  Sample Blog Post {item}
                </h3>
                <p className="text-xs text-neutral-400">
                  This is a placeholder for blog post excerpt...
                </p>
                <span className="text-xs text-neutral-500">
                  Jan {item}, 2024
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Blog Content */}
      <div className="h-[calc(100dvh-237px)] overflow-y-auto bg-neutral-900 xl:h-full">
        <div className="text-sm text-neutral-100">
          {/* Title */}
          <h3 className="font-michroma my-4 text-center text-xl text-white">
            Sample Blog Post Title
          </h3>

          {/* Featured Image */}
          <div className="xxl:h-[300px] relative h-[200px]">
            <div className="absolute top-0 left-0 size-full bg-gray-700">
              {/* Placeholder for featured image */}
              <div className="flex items-center justify-center size-full text-gray-400">
                Featured Image Placeholder
              </div>
            </div>
          </div>

          {/* Author and Date */}
          <div className="mb-4 flex items-center justify-between border-b-2 border-neutral-200 p-2 xl:px-12">
            <div className="flex items-center gap-2 lg:gap-4">
              <span className="size-10 overflow-hidden rounded-full bg-neutral-700 flex items-center justify-center text-white text-sm">
                A
              </span>
              <span className="font-michroma text-xs">
                AUTHOR NAME
              </span>
            </div>
            <div className="flex flex-col items-end gap-2 text-[10px] text-neutral-400 lg:flex-row lg:items-center lg:gap-4">
              <span className="font-michroma">
                January 1, 2024
              </span>
              <span className="font-michroma">
                5 min read
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="px-2">
            <p className="text-neutral-300 mb-4">
              This is placeholder content for the blog post. In the actual implementation,
              this would be populated with rich content from Sanity CMS.
            </p>
            <p className="text-neutral-300 mb-4">
              The content would include formatted text, images, and other rich media
              elements that make up a complete blog post.
            </p>
            <p className="text-neutral-300">
              For now, this serves as a visual placeholder to demonstrate the layout
              and styling of the resources page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

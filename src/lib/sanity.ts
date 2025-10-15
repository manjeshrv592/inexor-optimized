import { client } from "../../sanity/lib/client";

export { client };

export interface ResourcesPage {
  _id: string;
  blogSectionTitle: string;
  blogSectionSubtitle?: string;
  leftPanelBackgroundImage?: {
    asset: {
      url: string;
      mimeType: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
        lqip?: string;
      };
    };
    alt?: string;
  };
  isActive: boolean;
}

export async function getResourcesPage(): Promise<ResourcesPage | null> {
  const query = `*[_type == "resourcesPage" && isActive == true][0] {
    _id,
    blogSectionTitle,
    blogSectionSubtitle,
    leftPanelBackgroundImage {
      asset-> {
        url,
        mimeType,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    isActive
  }`;
  
  return client.fetch(query, {}, { next: { tags: ["resourcesPage"] } });
}
// This matches what FeaturedTabs expects
export interface FrontendProduct {
    id: number;
    name: string;
    image: string;
    category: string;
    price: number;
    is_available: boolean;
    description: string;
    targetGroup: string;
}

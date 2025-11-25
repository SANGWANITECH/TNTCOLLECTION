export interface Product {
    id: string;
    name: string;
    category: string;
    targetGroup: string;
    price: number;
    availability: 'available' | 'soldOut';
    description: string;
    imageUrl: string;
}


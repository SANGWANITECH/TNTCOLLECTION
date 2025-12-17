// types/order.ts
export type OrderStatus = "pending" | "sold" | "cancelled";

export interface OrderProduct {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    quantity: number;
}

export interface Order {
    id: number;
    products: OrderProduct[];
    status: OrderStatus;
    created_at: string;
    admin_id: string | null;
}

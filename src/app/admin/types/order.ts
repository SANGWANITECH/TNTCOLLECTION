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
    order_date: string;
    admin_id: string | null;
}

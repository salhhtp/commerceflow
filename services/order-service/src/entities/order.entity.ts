export interface Order {
    id: string;
    productIds: string[];
    totalAmount: number;
    status: string;
}

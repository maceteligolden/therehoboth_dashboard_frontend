import Base from "./base.model";

export default interface Wish extends Base {
    description?: string;
    amount?: number;
}

export type Wishtype  = {
    description?: string;
    amount?: number;
    _id?: string;
    created_at?: Date;
    updated_at?: Date;
}
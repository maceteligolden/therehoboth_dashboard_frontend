import Base from "@/lib/models/base.model";

export default interface Blog extends Base {
    thumbnail?: string;
    title?: string;
    content?: string;
}
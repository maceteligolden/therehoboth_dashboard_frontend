type status = "success" | "error";

export default interface IResponse {
    status: status;
    message: string;
}

export interface IResponseBase<T> extends IResponse {
    data: T
}
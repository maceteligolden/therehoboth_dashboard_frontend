import { listApi } from "../lib/api";
import IResponse, { IResponseBase } from "./dto/base";
import Blog from "./dto/blog";

const baseUrl = 'blogs';

export const blogEndpoint = listApi.injectEndpoints({
    endpoints: (build) => ({
        createBlog: build.mutation<IResponseBase<Blog>, Blog>({
            query: (body) => ({
                url: `${baseUrl}/create`,
                method: "POST",
                body,
            }),
        }),
        updateBlog: build.mutation<IResponseBase<Blog>, {id: string, body: Blog}>({
            query: ({id, body}) => ({
                url: `${baseUrl}/${id}`,
                method: "PATCH",
                body,
            }),
        }),
        deleteBlog: build.mutation<IResponse, {id: string}>({
            query: ({id}) => ({
                url: `${baseUrl}/${id}`,
                method: "DELETE",
            }),
        }),
        getBlogs: build.query <IResponseBase<Blog[]>, void>({
            query: () => `${baseUrl}`,
        }),
        getBlog: build.query <IResponseBase<Blog>, {id: string}>({
            query: ({id}) => `${baseUrl}/${id}`,
        })
    }),
});

export const {
   useGetBlogsQuery,
   useGetBlogQuery,
   useDeleteBlogMutation,
   useUpdateBlogMutation,
   useCreateBlogMutation
} = blogEndpoint;
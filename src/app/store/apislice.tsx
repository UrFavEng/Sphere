import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allreviewsByUser,
  GetAllArticles,
  getAllCats,
  getmeRES,
  SignupREQ,
  SignupRES,
} from "./types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }),
  tagTypes: ["dataUser"],
  endpoints: (builder) => ({
    signUp: builder.mutation<SignupRES, SignupREQ>({
      query: (body) => ({
        url: "auth/local/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dataUser"],
    }),

    updataUser: builder.mutation<
      SignupRES,
      { body: FormData; id: string | undefined }
    >({
      query: ({ body, id }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcyODg1MDY5OSwiZXhwIjoxNzMxNDQyNjk5fQ.ViY1e5L0Ymc3nbWgtVRROxx-Ua2z7nRjc5ET3U95_ts`,
        },
      }),
      invalidatesTags: ["dataUser"],
    }),
    getMe: builder.query<getmeRES, void>({
      query: () => ({
        url: "users/me?populate[image]=*&populate[articles][populate][image]=*&populate[articles][populate][user][populate]=image&populate[articles][populate][reviews][populate][user][populate]=image&populate[articles][populate][category]=*&populate[reviews][populate][article][populate][image]=*&populate[reviews][populate][article][populate][user][populate]=image&populate[reviews][populate][user][populate]=image",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcyODg1MDY5OSwiZXhwIjoxNzMxNDQyNjk5fQ.ViY1e5L0Ymc3nbWgtVRROxx-Ua2z7nRjc5ET3U95_ts`,
        },
      }),
      providesTags: ["dataUser"],
    }),
    getAllArticles: builder.query<GetAllArticles, void>({
      query: () =>
        "articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=users_permissions_user.image",
    }),
    getAllReviewsByUser: builder.query<allreviewsByUser, string | undefined>({
      query: (documentId) =>
        `reviews?populate[article][populate]=image&populate[article][populate]=user.image&populate[article][populate]=category&filters[user][documentId]=${documentId}`,
    }),

    getAllArticlesByCat: builder.query<GetAllArticles, string>({
      query: (cat) =>
        `articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=users_permissions_user.image&filters[category][name][$eq]=${cat}`,
    }),
    getAllArticlesByTitle: builder.query<GetAllArticles, string>({
      query: (name) =>
        `articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=users_permissions_user.image&filters[$or][0][title][$contains]=${name}&filters[$or][1][content][$contains]=${name}`,
    }),
    getAllCats: builder.query<getAllCats, void>({
      query: () => `categories`,
    }),
    getArticleById: builder.query<getAllCats, string>({
      query: (id) => `articles/${id}`,
    }),
    uploadUserImage: builder.mutation({
      query: ({ imageFile }) => {
        const formData = new FormData();
        formData.append("files", imageFile);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcyODg1MDY5OSwiZXhwIjoxNzMxNDQyNjk5fQ.ViY1e5L0Ymc3nbWgtVRROxx-Ua2z7nRjc5ET3U95_ts`,
          },
        };
      },
      invalidatesTags: ["dataUser"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, imageUrl }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: { image: imageUrl },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcyODg1MDY5OSwiZXhwIjoxNzMxNDQyNjk5fQ.ViY1e5L0Ymc3nbWgtVRROxx-Ua2z7nRjc5ET3U95_ts`,
        },
      }),
      invalidatesTags: ["dataUser"],
    }),
    addArticle: builder.mutation({
      query: (body) => ({
        url: `articles`,
        method: "POST",
        body: { data: body },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcyODg1MDY5OSwiZXhwIjoxNzMxNDQyNjk5fQ.ViY1e5L0Ymc3nbWgtVRROxx-Ua2z7nRjc5ET3U95_ts`,
        },
      }),
      invalidatesTags: ["dataUser"],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `articles/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcyODg1MDY5OSwiZXhwIjoxNzMxNDQyNjk5fQ.ViY1e5L0Ymc3nbWgtVRROxx-Ua2z7nRjc5ET3U95_ts`,
        },
      }),
    }),
    updateArticleContet: builder.mutation({
      query: ({ articleId, body }) => ({
        url: `articles/${articleId}`,
        method: "PUT",
        body: { data: body },
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTcyODg1MDY5OSwiZXhwIjoxNzMxNDQyNjk5fQ.ViY1e5L0Ymc3nbWgtVRROxx-Ua2z7nRjc5ET3U95_ts`,
        },
      }),
      invalidatesTags: ["dataUser"],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useUploadImageMutation,
  useUpdateArticleContetMutation,
  useSignUpMutation,
  useGetAllArticlesQuery,
  useGetAllCatsQuery,
  useGetAllArticlesByCatQuery,
  useGetAllArticlesByTitleQuery,
  useGetMeQuery,
  useGetAllReviewsByUserQuery,
  useUpdataUserMutation,
  useUploadUserImageMutation,
  useUpdateUserMutation,
  useAddArticleMutation,
  useGetArticleByIdQuery,
  useDeleteArticleMutation,
} = apiSlice;

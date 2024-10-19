import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  // allreviewsByUser,
  GetAllArticles,
  getAllCats,
  getmeRES,
  LoginRequest,
  LoginResponse,
  SignupREQ,
  SignupRES,
  VideoResponse,
} from "./types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",
  }),
  tagTypes: ["dataUser", "article", "video"],
  endpoints: (builder) => ({
    signUp: builder.mutation<SignupRES, SignupREQ>({
      query: (body) => ({
        url: "auth/local/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["dataUser"],
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/local",
        method: "POST",
        body: credentials,
      }),
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
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser"],
    }),
    getMe: builder.query<getmeRES, void>({
      query: () => ({
        url: "users/me?populate[image]=*&populate[articles][populate][image]=*&populate[articles][populate][category]=*&populate[articles][populate][user][populate][image]=*&populate[articles][populate][reviews][populate][user][populate][image]=*&populate[articles][populate][comments][populate][user][populate][image]=*&populate[articles][populate][reviews][populate][article][populate][image]=*&populate[reviews][populate][user][populate][image]=*&populate[reviews][populate][article][populate][image]=*&populate[comments][populate][user][populate][image]=*&populate[comments][populate][article][populate][image]=*&populate[comments][populate][article][populate][user][populate][image]=*",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      providesTags: ["dataUser"],
    }),
    getAllArticles: builder.query<GetAllArticles, void>({
      query: () =>
        `articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=user.image&sort=createdAt:desc`,
      providesTags: ["article"],
    }),
    // getAllReviewsByUser: builder.query<allreviewsByUser, string | undefined>({
    //   query: (documentId) =>
    //     `reviews?populate[article][populate]=image&populate[article][populate]=user.image&populate[article][populate]=category&filters[user][documentId]=${documentId}`,
    // }),

    getAllArticlesByCat: builder.query<GetAllArticles, string>({
      query: (cat) =>
        `articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=users_permissions_user.image&filters[category][name][$eq]=${cat}&sort=createdAt:desc`,
      providesTags: ["article"],
    }),
    getAllArticlesByTitle: builder.query<GetAllArticles, string>({
      query: (name) =>
        `articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=users_permissions_user.image&filters[$or][0][title][$contains]=${name}&filters[$or][1][content][$contains]=${name}&sort=createdAt:desc`,
      providesTags: ["article"],
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
            Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
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
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
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
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `reviews`,
        method: "POST",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article", "video"],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `articles/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article"],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article", "video"],
    }),
    updateReview: builder.mutation({
      query: ({ body, id }) => ({
        url: `reviews/${id}`,
        method: "PUT",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article", "video"],
    }),
    updateArticleContet: builder.mutation({
      query: ({ articleId, body }) => ({
        url: `articles/${articleId}`,
        method: "PUT",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article"],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["dataUser"],
    }),
    addComment: builder.mutation({
      query: (body) => ({
        url: `comments`,
        method: "POST",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article"],
    }),
    updateComment: builder.mutation({
      query: ({ body, id }) => ({
        url: `comments/${id}`,
        method: "PUT",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article"],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article"],
    }),
    getAllVideos: builder.query<VideoResponse, void>({
      query: () =>
        `videos?populate[poster]=*&populate[video]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[categoryvideo]=*&populate[comments][populate]=user.image&sort=createdAt:desc`,
      providesTags: ["video"],
    }),
    getAllCatsVideo: builder.query<getAllCats, void>({
      query: () => `categoryvideos`,
    }),
    addVideo: builder.mutation({
      query: (body) => ({
        url: `videos`,
        method: "POST",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "video"],
    }),
    updateVideo: builder.mutation({
      query: ({ VideoId, body }) => ({
        url: `videos/${VideoId}`,
        method: "PUT",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "video"],
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
  useUpdataUserMutation,
  useUploadUserImageMutation,
  useUpdateUserMutation,
  useAddArticleMutation,
  useGetArticleByIdQuery,
  useDeleteArticleMutation,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useLoginMutation,
  useGetAllVideosQuery,
  useGetAllCatsVideoQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
} = apiSlice;

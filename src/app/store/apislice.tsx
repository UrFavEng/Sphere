import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ApiResAudio,
  // allreviewsByUser,
  GetAllArticles,
  getAllCats,
  GetMeAudios,
  getmeRES,
  GetMeVideos,
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
  tagTypes: ["dataUser", "article", "video", "audio"],
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
    getMeVideos: builder.query<GetMeVideos, void>({
      query: () => ({
        url: "users/me?populate[videos]=*&populate[videos][populate][poster]=*&populate[videos][populate][categoryvideo]=*&populate[videos][populate][video]=*&populate[videos][populate][user][populate]=image&populate[videos][populate][reviews][populate]=user.image&populate[videos][populate][comments][populate]=user.image",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      providesTags: ["dataUser", "video"],
    }),
    getMeAudios: builder.query<GetMeAudios, void>({
      query: () => ({
        url: "users/me?populate[audioos][populate][audioMedia]=*&populate[audioos][populate][reviews][populate][user][populate]=image&populate[audioos][populate][comments][populate][user][populate]=image",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      providesTags: ["dataUser", "video"],
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
        `articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=user.image&filters[category][name][$eq]=${cat}&sort=createdAt:desc`,
      providesTags: ["article"],
    }),
    getAllArticlesByTitle: builder.query<GetAllArticles, string>({
      query: (name) =>
        `articles?populate[image]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[category][populate]=*&populate[comments][populate]=user.image&filters[$or][0][title][$contains]=${name}&filters[$or][1][content][$contains]=${name}&sort=createdAt:desc`,
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
      invalidatesTags: ["dataUser", "article", "video", "audio"],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `articles/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article", "video", "audio"],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `reviews/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article", "video", "audio"],
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
      invalidatesTags: ["dataUser", "article", "video", "audio"],
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
      invalidatesTags: ["dataUser", "article", "video", "audio"],
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
      invalidatesTags: ["dataUser", "article", "video", "audio"],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "article", "video", "audio"],
    }),
    getAllVideos: builder.query<VideoResponse, void>({
      query: () =>
        `videos?populate[poster]=*&populate[video]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[categoryvideo]=*&populate[comments][populate]=user.image&sort=createdAt:desc`,
      providesTags: ["video"],
    }),
    getAllAudios: builder.query<ApiResAudio, void>({
      query: () =>
        `audioos?&populate[audioMedia]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[categoryaudio]=*&populate[comments][populate]=user.image&sort=createdAt:desc`,
      providesTags: ["audio"],
    }),
    getAllAudiosByCat: builder.query<ApiResAudio, string>({
      query: (cat) =>
        `audioos?&populate[audioMedia]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[categoryaudio]=*&populate[comments][populate]=user.image&filters[categoryaudio][name][$eq]=${cat}&sort=createdAt:desc`,
      providesTags: ["audio"],
    }),
    getAllVideosByCat: builder.query<VideoResponse, string>({
      query: (cat) =>
        `videos?populate[poster]=*&populate[video]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[categoryvideo]=*&populate[comments][populate]=user.image&filters[categoryvideo][name][$eq]=${cat}&sort=createdAt:desc`,
      providesTags: ["video"],
    }),
    getAllVideosByTitle: builder.query<VideoResponse, string>({
      query: (name) =>
        `videos?populate[poster]=*&populate[video]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[categoryvideo]=*&populate[comments][populate]=user.image&filters[title][$contains]=${name}&sort=createdAt:desc`,
      providesTags: ["video"],
    }),
    getAllAudiosByTitle: builder.query<ApiResAudio, string>({
      query: (name) =>
        `audioos?&populate[audioMedia]=*&populate[reviews][populate]=user.image&populate[user][populate]=image&populate[categoryaudio]=*&populate[comments][populate]=user.image&filters[title][$contains]=${name}&sort=createdAt:desc`,
      providesTags: ["audio"],
    }),

    getAllCatsVideo: builder.query<getAllCats, void>({
      query: () => `categoryvideos`,
    }),
    getAllCatsAudio: builder.query<getAllCats, void>({
      query: () => `categoryaudios`,
      providesTags: ["audio"],
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
    addAudio: builder.mutation({
      query: (body) => ({
        url: `audioos`,
        method: "POST",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "audio"],
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
    updateAudio: builder.mutation({
      query: ({ VideoId, body }) => ({
        url: `audioos/${VideoId}`,
        method: "PUT",
        body: { data: body },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "audio"],
    }),
    deleteVideo: builder.mutation<void, string>({
      query: (id) => ({
        url: `videos/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "video"],
    }),
    deleteAudio: builder.mutation<void, string>({
      query: (id) => ({
        url: `audioos/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("JWTSphere")}`,
        },
      }),
      invalidatesTags: ["dataUser", "audio"],
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
  useGetMeVideosQuery,
  useDeleteVideoMutation,
  useGetAllVideosByCatQuery,
  useGetAllVideosByTitleQuery,
  useGetAllCatsAudioQuery,
  useGetAllAudiosQuery,
  useAddAudioMutation,
  useDeleteAudioMutation,
  useUpdateAudioMutation,
  useGetAllAudiosByCatQuery,
  useGetAllAudiosByTitleQuery,
  useGetMeAudiosQuery,
} = apiSlice;

interface GetAllArticlesImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface GetAllArticlesImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: GetAllArticlesImageFormat;
    small: GetAllArticlesImageFormat;
    medium: GetAllArticlesImageFormat;
    large: GetAllArticlesImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface GetAllArticlesUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  image: GetAllArticlesImage;
}

export interface GetAllArticlesReview {
  id: number;
  documentId: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  user: GetAllArticlesUser;
  article: GetAllArticlesArticle;
  content?: string;
}

interface GetAllArticlesContent {
  type: string;
  children: { type: string; text: string }[];
}

export interface GetAllArticlesArticle {
  id: number;
  documentId: string;
  imageURL: string;
  title: string;
  content: string;
  tags: string[] | null;
  views: number | null;
  isFeatured: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  image: GetAllArticlesImage;
  reviews: GetAllArticlesReview[];
  comments: GetAllArticlesReview[];
  user: GetAllArticlesUser;
  category: {
    id: number;
    documentId: string;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
  };
}

interface GetAllArticlesMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface GetAllArticles {
  data: GetAllArticlesArticle[];
  meta: GetAllArticlesMeta;
}
//---------------
// Interface for the image format
interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

// Interface for the icon
interface Icon {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

// Interface for the user data
interface getAllCatsUser {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  icon: Icon;
}

// Interface for pagination metadata
interface getAllCatsPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// Interface for meta data
interface getAllCatsMeta {
  pagination: getAllCatsPagination;
}

// Interface for the API response
export interface getAllCats {
  data: getAllCatsUser[];
  meta: getAllCatsMeta;
}
//--
interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string; // يمكن استخدام Date إذا كنت ستقوم بتحويلها لاحقاً
  updatedAt: string; // يمكن استخدام Date إذا كنت ستقوم بتحويلها لاحقاً
  publishedAt: string; // يمكن استخدام Date إذا كنت ستقوم بتحويلها لاحقاً
  locale: string | null;
  image: GetAllArticlesImage;
}

export interface SignupRES {
  jwt: string;
  user: User;
}
export interface SignupREQ {
  username: string;
  email: string;
  password: string;
}
// get me
export interface getmeRES {
  blocked: boolean;
  blconfirmedocked: boolean;
  articles: GetAllArticlesArticle[];
  createdAt: string;
  documentId: string;
  email: string;
  id: number;
  image: GetAllArticlesImage;
  bio: string;
  location: string;
  expertise: string;
  publishedAt: string;
  reviews: GetAllArticlesReview[];
  comments: GetAllArticlesReview[];
  updatedAt: string;
  username: string;
}

//-- get all reviews by user
interface allreviewsByUserData {
  article: {
    id: number;
    documentId: string;
    title: string;
    content: GetAllArticlesContent[];
    tags: string[] | null;
    views: number | null;
    isFeatured: boolean | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    image: GetAllArticlesImage;
    reviews: GetAllArticlesReview[];
    comments: GetAllArticlesReview[];
    user: GetAllArticlesUser;
    category: {
      id: number;
      documentId: string;
      name: string;
      description: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
      icon: GetAllArticlesImage;
    };
  };
  comment: string;
  createdAt: string;
  documentId: string;
  id: number;
  locale: null;
  publishedAt: string;
  rating: number;
  updatedAt: string;
}
export interface allreviewsByUser {
  data: allreviewsByUserData[];
  meta: getAllCatsMeta;
}

export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    // Add other user fields as needed
  };
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

//-------video
export interface VideoData {
  poster: GetAllArticlesImage;
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  content: string | null;
  video: VideoFileData;
  reviews: ReviewVideo[];
  user: UserVideo;
  categoryvideo: CategoryVideo;
  comments: CommentVideo[];
}

interface VideoFileData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: any | null; // يمكنك استبداله بنوع أكثر تحديدًا إذا كان لديك تفاصيل.
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface ReviewVideo {
  id: number;
  documentId: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  reviewed: string;
  user: UserVideo;
}

interface UserVideo {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  bio: string | null;
  expertise: string | null;
  location: string | null;
  image: GetAllArticlesImage | null;
}

interface CategoryVideo {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface CommentVideo {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  commented: string;
  user: UserVideo;
}

// النتيجة النهائية
export interface VideoResponse {
  data: VideoData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface GetMeVideos {
  id: number;
  username: string;
  email: string;
  bio: string;
  expertise: string;
  documentId: string;
  location: string;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string; // يمكن استخدام `Date` بدلاً من `string` إذا كانت قيمة التاريخ تحتاج إلى معالجة
  updatedAt: string; // يمكن تحويلها إلى `Date` أيضًا
  publishedAt: string; // يمكن تحويلها إلى `Date`
  locale: string | null; // قد يكون هناك استخدام null
  provider: string;
  videos: VideoData[];
}

//------
//------
//------
//------
interface AudioMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: FormatsAudio | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadataAudio;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface FormatsAudio {
  thumbnail: FormatDetailAudio;
  small: FormatDetailAudio;
  large: FormatDetailAudio;
  medium: FormatDetailAudio;
}

interface FormatDetailAudio {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  provider_metadata: ProviderMetadataAudio;
}

interface ProviderMetadataAudio {
  public_id: string;
  resource_type: string;
}

interface UserImageAudio {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: FormatsAudio;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadataAudio;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface UserAudio {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  bio: string | null;
  expertise: string | null;
  location: string | null;
  image: UserImageAudio;
}

export interface ReviewAudio {
  id: number;
  documentId: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  reviewed: string;
  user: User;
}

interface CategoryAudio {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface CommentAudio {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  commented: string;
  user: User;
}

export interface DataItemAudoi {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  audioMedia: AudioMedia;
  reviews: ReviewAudio[];
  user: UserAudio;
  categoryaudio: CategoryAudio;
  comments: CommentAudio[];
}

export interface ApiResAudio {
  data: DataItemAudoi[];
}

//---
export interface GetMeAudios {
  id: number;
  username: string;
  email: string;
  bio: string;
  expertise: string;
  documentId: string;
  location: string;
  blocked: boolean;
  confirmed: boolean;
  createdAt: string; // يمكن استخدام `Date` بدلاً من `string` إذا كانت قيمة التاريخ تحتاج إلى معالجة
  updatedAt: string; // يمكن تحويلها إلى `Date` أيضًا
  publishedAt: string; // يمكن تحويلها إلى `Date`
  locale: string | null; // قد يكون هناك استخدام null
  provider: string;
  audioos: DataItemAudoi[];
}

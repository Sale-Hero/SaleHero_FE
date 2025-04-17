export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface CommunityState {
  posts: Post[];
  selectedPost: Post | null;
  tips: Tip[];
  loading: boolean;
  error: string | null;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

export interface CourseType {
  category: {
    name: string;
  };
  name: string;
  thumbnail: string;
  thumbnail_url: string;
  total_students: number;
  _id: string;
  id?: string;
}

export interface DataForm {
  name: string;
  categoryId: string;
  tagline: string;
  description: string;
  thumbnail?: File | string;
}

export interface courseDetail {
  category: {
    name: string;
  };
  description: string;
  details: [];
  manager: string;
  name: string;
  students: [];
  tagline: string;
  thumbnail?: File | string;
}

export interface courseInfo {
  image?: File | string;
  total_students: number;
  category: string;
  total_content: number;
}

export interface courseContent {
  _id: string | number;
  title: string;
  type: string;
}

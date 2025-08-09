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
  thumbnail: File | string;
}

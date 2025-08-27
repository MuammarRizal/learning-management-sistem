import type { DataForm } from "../types/course.type";
import { apiInstanceAuth } from "../utils/axios";

export const getCourses = async () => apiInstanceAuth.get("/courses").then((res) => res.data);

export const getCourseDetailById = async (id: string) => apiInstanceAuth.get(`/courses/${id}`).then((res) => res.data);

export const createCourses = async (data: DataForm) =>
  apiInstanceAuth
    .post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const updateCourses = async (id: string, data: DataForm) =>
  apiInstanceAuth
    .put(`/courses/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const deleteCourseById = async (id: string) => apiInstanceAuth.delete(`/courses/${id}`).then((res) => res.data);

export const createContentCourse = async (data: any) => apiInstanceAuth.post("/courses/contents", data).then((res) => res.data);

import type { DataForm } from "../types/course.type";
import { apiInstanceAuth } from "../utils/axios";

export const getCourses = async () => apiInstanceAuth.get("/courses").then((res) => res.data);
export const createCourses = async (data: DataForm) =>
  apiInstanceAuth
    .post("/courses", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

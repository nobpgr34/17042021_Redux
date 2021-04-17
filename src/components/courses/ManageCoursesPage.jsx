import { useState, useEffect } from "react";
import { Redirect, useParams } from "@reach/router";
import { courseAdded, getCourses } from "../../store/courses";
import useCourses from "../../hooks/useCourses";
import CourseForm from "./CourseForm";

const newCourse = {
  title: "",
  authorId: "",
  category: "",
};

const CoursesPage = () => {
  const [course, setCourse] = useState({ ...newCourse });
  const [error, setError] = useState({});
  const { dispatch, courses, authors } = useCourses();

  const { slug } = useParams();

  useEffect(() => {
    const course =
      slug !== "new" && courses.length
        ? courses.find((c) => c.slug === slug)
        : newCourse;
    setCourse(course);
  }, [courses, slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: name === "authorId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
  };

  return (
    <div className="container mt-5">
      <h1>Manage Course</h1>
      <CourseForm
        course={course}
        authors={authors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={error}
      />
    </div>
  );
};

export default CoursesPage;

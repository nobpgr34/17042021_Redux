import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "@reach/router";
import { toast } from "react-toastify";
import { saveCourse } from "../../store/courses";
import useCourses from "../../hooks/useCourses";
import CourseForm from "./CourseForm";
import { FullSpinner } from "../../styles/app";

const newCourse = {
  title: "",
  authorId: "",
  category: "",
};

const CoursesPage = () => {
  const [course, setCourse] = useState({ ...newCourse });
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [saving, setSaving] = useState(false);

  const { dispatch, courses, authors } = useCourses();

  const { slug } = useParams();
  const { loading } = useSelector((state) => state.apiStatus);

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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};
    if (!title) errors.title = "title cannot be blank";
    if (!authorId) errors.authorId = "authorId cannot be blank";
    if (!category) errors.category = "category cannot be blank";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    dispatch(saveCourse(course))
      .then(() => {
        toast.success("Course saved");
        setRedirect(true);
      })
      .catch((err) => {
        setErrors({ onSave: err.message });
        setSaving(false);
      });
  };

  return (
    <div className="container mt-5">
      {redirect && <Redirect to="/courses" noThrow />}
      {loading > 0 && <FullSpinner />}
      <h1>Manage Course</h1>
      <CourseForm
        course={course}
        authors={authors}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
        saving={saving}
      />
    </div>
  );
};

export default CoursesPage;

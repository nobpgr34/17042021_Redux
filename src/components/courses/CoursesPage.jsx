import { Link } from "@reach/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CourseList from "./CoursesList";
import useCourses from "../../hooks/useCourses";
import { FullSpinner } from "../../styles/app";
import { deleteCourse, courseAdded } from "../../store/courses";

const CoursesPage = () => {
  const { courses, dispatch } = useCourses();

  const { loading } = useSelector((state) => state.apiStatus);

  const handleDelete = async (course) => {
    toast.success("Course deleted");
    try {
      await dispatch(deleteCourse(course));
    } catch (err) {
      toast.error("Delete failled " + err.message, { autoClose: false });
      dispatch(courseAdded(course));
    }
  };

  if (loading > 0) {
    return <FullSpinner />;
  }

  return (
    <div className="container mt-5">
      <h1>Courses Page</h1>
      <Link to="/course/new" className="btn btn-primary btn-lg my-3">
        Add Course
      </Link>
      <CourseList handleDelete={handleDelete} courses={courses} />
    </div>
  );
};

export default CoursesPage;

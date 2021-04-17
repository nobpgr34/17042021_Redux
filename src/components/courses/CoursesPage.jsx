import { Link } from "@reach/router";
import CourseList from "./CoursesList";
import useCourses from "../../hooks/useCourses";

const CoursesPage = () => {
  const { courses } = useCourses();
  return (
    <div className="container mt-5">
      <h1>Courses Page</h1>
      <Link to="/course/new" className="btn btn-primary btn-lg my-3">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </div>
  );
};

export default CoursesPage;

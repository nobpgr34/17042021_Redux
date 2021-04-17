import { Link } from "@reach/router";
import { memo } from "react";

const CoursesList = ({ courses }) => {
  if (!courses.length) {
    return null;
  }
  console.log("rerender");
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course, index) => (
          <tr key={course.id}>
            <td>{index + 1}</td>
            <td>
              <Link to={`/course/${course.slug}`}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <button className="btn btn-outline-danger">Delete course</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

CoursesList.defaultProps = {
  courses: [],
};

export default memo(CoursesList);

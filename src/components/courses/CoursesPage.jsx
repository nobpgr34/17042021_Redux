import { useState } from "react";

const initialCourse = {
  title: "",
};

const CoursesPage = () => {
  const [course, setCourse] = useState(initialCourse);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(course);
  };

  return (
    <div className="container mt-5">
      <h1>Courses Page</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={handleChange}
            value={course.title}
            name="title"
            id="title"
            type="text"
            className="form-control"
          />
        </div>

        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default CoursesPage;

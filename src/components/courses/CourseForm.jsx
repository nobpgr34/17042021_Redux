import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const CourseForm = ({
  course,
  authors,
  handleSubmit,
  handleChange,
  saving,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit} className="col-md-4">
      <h1>{course.id ? "Edit" : "Add"}</h1>
      {errors.onSave && (
        <div className="alert alert-danger">{errors.onSave}e</div>
      )}
      <TextInput
        name="title"
        label="title"
        handleChange={handleChange}
        value={course.title}
        error={errors.title}
      />
      <SelectInput
        name="authorId"
        title="authorId"
        defaultOption="select author"
        value={course.authorId || ""}
        label="SelectAuthor"
        handleChange={handleChange}
        error={errors.authorId}
        options={authors.map((a) => ({ value: a.id, text: a.name }))}
      />
      <TextInput
        name="category"
        label="category"
        handleChange={handleChange}
        value={course.category}
        error={errors.category}
      />
      <button className="btyn btn-primary btn-lg" disabled={saving}>
        {saving ? "Saving" : "Save"}
      </button>
    </form>
  );
};

export default CourseForm;

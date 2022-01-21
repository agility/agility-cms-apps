const EditForm = ({ form }) => {
  if (form) {
    return (
      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.open(form.edit_url, "_blank", "noopener, noreferrer");
          }
        }}
        className="btn btn-primary edit-btn"
      >
        Edit Form
      </button>
    );
  }
  return null;
};

export default EditForm;

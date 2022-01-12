const FormStats = ({ form }) => {
  if (form) {
    return (
      <p className="form-stats">
        Submissions: Total - {form.submissions}, Today -{" "}
        {form.submissions_today}, Unread - {form.submissions_unread}
      </p>
    );
  }
  return null;
};

export default FormStats;

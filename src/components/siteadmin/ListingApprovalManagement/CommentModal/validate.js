
const validate = values => {

  const errors = {}

  if (!values.comment) {
    errors.comment = 'Please Comment';
  } else if (values.comment && values.comment.toString().trim() == '') {
    errors.comment = 'Please Comment a valid reason';
  }

  return errors
}

export default validate;
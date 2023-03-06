import messages from '../../locale/messages';
import { isValidHttpUrl } from '../../helpers/formatURL';

const validate = values => {

  const errors = {}

  if (!values.title) {
    errors.title = messages.required;
  }

  if (!values.url) {
    errors.url = messages.required;
  }

  if (!!values.url && !isValidHttpUrl(values.url)) {
	errors.url = messages.urlError;
  }

  return errors
}

export default validate

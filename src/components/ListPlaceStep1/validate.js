import messages from '../../locale/messages';
import { isValidHttpUrl } from '../../helpers/formatURL';

const validate = values => {

  const errors = {}

  if (!values.houseType) {
    errors.houseType = messages.required;
  }

  if (!values.country) {
    errors.country = messages.required;
  }

  if (!values.state) {
    errors.state = messages.required;
  }

  if (!values.city) {
    errors.city = messages.required;
  }

  if (!values.street) {
    errors.street = messages.required;
  }

  if (!values.zipcode) {
    errors.zipcode = messages.required;
  }

  if (!!values.bizverseLink360 && !isValidHttpUrl(values.bizverseLink360)) {
		errors.bizverseLink360 = messages.urlError;
	}

  return errors
}

export default validate

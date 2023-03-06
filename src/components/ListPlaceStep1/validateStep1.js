import messages from '../../locale/messages';
import { isValidHttpUrl } from '../../helpers/formatURL';

const validateStep1 = values => {
	const errors = {};

	if (!!values.bizverseLink360 && !isValidHttpUrl(values.bizverseLink360)) {
		errors.bizverseLink360 = messages.urlError;
	}

	return errors;
}

export default validateStep1;

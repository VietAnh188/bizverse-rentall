import messages from '../../../locale/messages';

const validate = values => {

  const errors = {}

  if ((!values.guestValue || !values.guestValue.toString().trim()) && values.guestValue !== 0) {
    errors.guestValue = messages.provideFixedGuestFee;
  }

  if ((!values.hostValue || !values.hostValue.toString().trim()) && values.hostValue !== 0) {
    errors.hostValue = messages.provideFixedHostFee;
  }

  if (values.guestType === 'fixed' || values.hostType === 'fixed') {
    if (!values.currency) {
      errors.currency = messages.currencyRequiredLabel;
    }
  }

  if (isNaN(values.guestValue)) {
    errors.guestValue = messages.onlyNumericKey;
  }

  if (isNaN(values.hostValue)) {
    errors.hostValue = messages.onlyNumericKey;
  }

  if (values.guestType === 'fixed') {
    if (values.guestValue && parseInt(values.guestValue, 10) < 0) {
      errors.guestValue = messages.invalid;
    }
  }

  if (values.hostType === 'fixed') {
    if (values.hostValue && parseInt(values.hostValue, 10) < 0) {
      errors.hostValue = messages.invalid;
    }
  }

  if (values.guestType === 'percentage') {
    if (values.guestValue && (parseInt(values.guestValue, 10) < 0 || parseInt(values.guestValue, 10) > 99)) {
      errors.guestValue = messages.choosePresentageValue;
    }
  }

  if (values.hostType === 'percentage') {
    if (values.hostValue && (parseInt(values.hostValue, 10) < 0 || parseInt(values.hostValue, 10) > 99)) {
      errors.hostValue = messages.choosePresentageValue;
    }
  }

  return errors
}

export default validate;
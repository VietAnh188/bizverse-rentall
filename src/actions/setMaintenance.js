import { SET_MAINTENANCE } from '../constants';

export function setMaintenance({ name, value }) {
  return {
    type: SET_MAINTENANCE,
    payload: {
      name,
      value,
    },
  };
}

import ResponseType from '../types/ResponseType';

const userLogout = {
  type: ResponseType,
  async resolve({ request, response }) {

    try {
      response.clearCookie('id_token');
      
      return {
        status: 200
      }
    } catch (error) {

      return {
        status: 400
      }
    }
  },
};

export default userLogout;

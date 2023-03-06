import SiteSettingsType from '../../../types/siteadmin/SiteSettingsType';
import { SiteSettings } from '../../../models';

const removeFavIconLogo = {

  type: SiteSettingsType,

  async resolve({ request }) {

    if (request.user && request.user.admin == true) {

      let removeFavIconLogo = await SiteSettings.destroy({
        where: {
          title: 'Favicon Logo'
        }
      });

      if (removeFavIconLogo) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: 'not logged in'
      }
    }

  },
};

export default removeFavIconLogo;

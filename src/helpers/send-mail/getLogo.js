import { SiteSettings } from '../../data/models'
export const getLogo = async (name) => {
    try{
        const logo = await SiteSettings.findOne({
            where: {
                name
            }
        });
        return logo && logo.value;
    }catch{
        return null;
    }
}
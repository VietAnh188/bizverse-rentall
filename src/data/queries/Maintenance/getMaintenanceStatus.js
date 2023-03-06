
import getLocaleMessage from '../../../helpers/message/getLocaleMessage';
import { Maintenance } from '../../models';
import GetMaintenanceStatusType from "../../types/Maintenance/getMaintenanceStatusType";

const getMaintenanceStatus =  {
   type:  GetMaintenanceStatusType,
   async resolve ({request, response}){
     try {
        if(request.user && !request.user.admin || !request.user){
            return {
                status: 400,
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.noPermission"})
            }
         }
         // check for the previous maintenance has deactivate
         const [web, marketplace, app] = await Promise.all([
            Maintenance.findOne({
                where: {
                    type: "web"
                },
                order: [['id', 'DESC']]
            }),
            Maintenance.findOne({
                where: {
                    type: "marketplace"
                },
                order: [['id', 'DESC']]
            }),
            Maintenance.findOne({
                where: {
                    type: "app"
                },
                order: [['id', 'DESC']]
            }),
         ])
         
         return {
            results: { web, app, marketplace },
            status: 200,
            errorMessage: null
         }
     } catch (error) {
        return {
            status: 500,
            errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"}) + error.message
        }
     }

   }
};
export default getMaintenanceStatus;
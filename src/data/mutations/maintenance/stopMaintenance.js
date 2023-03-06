// GrpahQL
import moment from 'moment';
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
    GraphQLEnumType as EnumType
  } from 'graphql';
import getLocaleMessage from '../../../helpers/message/getLocaleMessage';
import { Maintenance } from '../../models';
import MaintenanceCommonType from "../../types/Maintenance/MaintenanceType";
import { MaintenanceEnumType } from "../../types/Maintenance/MaintenanceType";
import { setMaintenance } from "../../../helpers/maintenance/setMaintenance"

const stopMaintenance =  {
    type:  MaintenanceCommonType,
    args: {
     type: { type: MaintenanceEnumType },
    },
    async resolve ({ request, response }, { type }){
      try {
         if(request.user && !request.user.admin || !request.user){
             return {
                 status: 400,
                 errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.noPermission"})
             }
          }
          // check for the previous maintenance has deactivate
          let status = 200, errorMessage = null;
          const maintenance = await Maintenance.findOne({
             where: {
                 type,
                 $or: [
                    { active: true },
                    { startTime: { $gte: new Date() }},
                    { endTime: { $gte: new Date() }}
                 ]
             },
             order: [
                 ["id","DESC"]
             ]
          });
   
          if(!maintenance){
             return {
                 status: 500,
                 errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"})
             }
          }
          // 
          maintenance.active = false;
          maintenance.startTime = new Date();
          maintenance.endTime = new Date();
          await maintenance.save();
          setMaintenance(type, { active: false, stopCronJob: true });
          return {
             results: maintenance,
             status,
             errorMessage
          }
      } catch (error) {
         return {
             status: 500,
             errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"}) + error.message
         }
      }
 
    }
 };
export default stopMaintenance;
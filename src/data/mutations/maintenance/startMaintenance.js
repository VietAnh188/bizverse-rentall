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
import { setMaintenanceTime } from "../../../helpers/maintenance/setMaintenanceTime"

const startMaintenance =  {
   type:  MaintenanceCommonType,
   args: {
    type: { type: MaintenanceEnumType },
    startTime: { type: StringType },
    endTime: { type: StringType },
    description: { type: StringType }
   },
   async resolve ({request, response}, { type, startTime, endTime, description }){
     try {
        if(request.user && !request.user.admin || !request.user){
            return {
                status: 400,
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.noPermission"})
            }
         }
         // check for the previous maintenance has deactivate
         const lastMaintenance = await Maintenance.findOne({
            where: {
                type
            },
            order: [
                ["id","DESC"]
            ]
         });
         if(lastMaintenance && lastMaintenance.active){
            return {
                status: 500,
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.maintenanceStop"})
            }
         };
         let maintenance = null, status = 200, errorMessage = null;
         if(startTime && endTime){
            if( new Date().getTime() > Number(startTime) || Number(startTime) > Number(endTime)){
                return {
                    status: 400,
                    errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.maintenanceInvalidInput"})
                }
            }
            maintenance =  await Maintenance.create({
                type, 
                startTime: new Date(Number(startTime)), 
                endTime: new Date(Number(endTime)),
                description
            });
            setMaintenanceTime(type, "both", [new Date(Number(startTime)), new Date(Number(endTime))])
         }else if(startTime){
            maintenance =  await Maintenance.create({
                type,
                startTime: new Date(Number(startTime)), 
                description 
            });
            setMaintenanceTime(type, "start", [new Date(Number(startTime))])
         }else if(endTime){
            maintenance =  await Maintenance.create({
                type, 
                endTime: new Date(Number(endTime)),
                startTime: new Date(), 
                description, 
                active: true  
            });
            setMaintenanceTime(type, "end", [new Date(Number(endTime))])
         }else{
            maintenance =  await Maintenance.create({
                type, description, active: true,
                startTime: new Date() 
            });
            setMaintenanceTime(type, "instance")
         }
         if(!maintenance){
            return {
                status: 500,
                errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"})
            }
         }
         return {
            results: maintenance,
            status,
            errorMessage
         }
     } catch (error) {
        console.log(error)
        return {
            status: 500,
            errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"}) + error.message
        }
     }

   }
};
export default startMaintenance;
import { getGraphQLParams,  } from 'express-graphql';
import gql from 'graphql-tag';
import { getMaintenance } from "../helpers/maintenance/getMaintenance";
import getLocaleMessage from "../helpers/message/getLocaleMessage"
import { SYSTEM } from '../constants/system';
import moment from "moment";
import { permissionsWeb, permissionMarketplace } from './permissions';
export const checkMaintenance = (system) => async (req, res, next) => {
    try{
        const params = await getGraphQLParams(req);
        const obj = gql`${params.query}`;
        const operation = obj.definitions[0].operation;
        const fieldName = obj.definitions[0].selectionSet.selections[0].name.value;
        if(fieldName === '__schema' || fieldName === '__type') return next();
        const permissions = system === SYSTEM.WEB ? permissionsWeb : permissionMarketplace;
        if(!permissions[operation][fieldName]){
            return res.status(400).json({ message: `Field not found in schema`})
        }
        const isActive =  await permissionsWeb[operation][fieldName]();
        if(isActive){
            const { startTime, endTime } = await getMaintenance(SYSTEM.WEB);
            const _startTime = moment.isDate(startTime) ? moment(startTime).format('YYYY-MM-DD HH:mm:ss') : null;
            const _endTime = moment.isDate(endTime) ? moment(endTime).format('YYYY-MM-DD HH:mm:ss') : null;
            return res.status(503).json({
                message: await getLocaleMessage({ locale: req.language, messageId: "error.maintenance"}),
                status: 503,
                startTime: _startTime,
                endTime: _endTime
                })
        }
        return next();
    }catch(error){
        return next();
    }
};
export const checkMaintenanceWeb = checkMaintenance(SYSTEM.WEB);
export const checkMaintenanceMarketplace = checkMaintenance(SYSTEM.MARKETPLACE);





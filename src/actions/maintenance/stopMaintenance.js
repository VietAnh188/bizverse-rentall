import { default as axios } from "axios";
import { gql } from "react-apollo";
import { STOP_MAINTENANCE_ERROR, STOP_MAINTENANCE_START, STOP_MAINTENANCE_SUCCESS } from "../../constants";

axios.defaults.withCredentials = true;
export function stopMaintenance({type}) {
    return async (dispatch, getState, {client}) => {
        dispatch({
            type: STOP_MAINTENANCE_START,
        });

        try {
            let mutation= gql`
            mutation stopMaintenance(
                $type: MaintenanceEnumType
            ){
                stopMaintenance(type: $type){
                    results {
                        type
                    }
                    status
                    errorMessage
                }
            }`;
            let mutationApp = `
            mutation stopMaintenance(
                $type: MaintenanceEnumType
            ){
                stopMaintenance(type: $type){
                    results {
                        type
                    }
                    status
                    errorMessage
                }
            }`;
            if(type !== "app") {
                const { data } = await client.mutate({
                mutation,
                variables: {
                    type
                    }
                });

                if(data?.stopMaintenance?.status === 200){
                    dispatch({
                        type: STOP_MAINTENANCE_SUCCESS,
                        payload: {
                            statusMaintenance: false
                        }
                    });
                } else {
                    dispatch({
                        type: STOP_MAINTENANCE_ERROR,
                        payload: {
                            statusMaintenance: true,
                            error: data.stopMaintenance.errorMessage
                        }
                    })
                }
            } else if (type === 'app') {
                let config = {
                    method: 'post',
                    url: `/api/graphql`,
                    data: JSON.stringify({
                        query: mutationApp,
                        variables: {
                            type
                        }
                    })
                }
                const resp = await axios(config)
                 dispatch({
                     type:"STOP_MAINTENANCE_APP_SUCCESS",
                     payload: resp
                 })
        } 
    } catch (error) {
            dispatch({
                type: STOP_MAINTENANCE_ERROR,
                payload: {
                    statusMaintenance: true,
                    error
                }
            });
        }
    }
}
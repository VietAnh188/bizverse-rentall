import axios from "axios";
import { gql } from "react-apollo";
import { toastr } from "react-redux-toastr";
import { GET_MAINTENANCE_STATUS_ERROR, GET_MAINTENANCE_STATUS_START, GET_MAINTENANCE_STATUS_SUCCESS } from "../../constants";


const query = gql`
{
    getMaintenanceStatus {
            results {
                web {
                    active
                    startTime
                    endTime
                }
                marketplace {
                    active
                    startTime
                    endTime
                }
                app {
                    active
                    startTime
                    endTime
                }
            }
            status
            errorMessage
    }
}`;
export function getMaintenanceStatus() {
    return async (dispatch, getState, {client}) => {
        dispatch({
            type: GET_MAINTENANCE_STATUS_START,
        });
        try {
            const { data } = await client.query({
                query,
                fetchPolicy: "network-only",
            });
            // let config = {
            //     method: 'get',
            //     url: `https://dev.rentall.world/graphql`,

            //     data: JSON.stringify({
            //         query: `
            //         {
            //             getMaintenanceStatus {
            //                     results {
            //                         web {
            //                             active
            //                             startTime
            //                             endTime
            //                         }
            //                         marketplace {
            //                             active
            //                             startTime
            //                             endTime
            //                         }
            //                         app {
            //                             active
            //                             startTime
            //                             endTime
            //                         }
            //                     }
            //                     status
            //                     errorMessage
            //             }
            //         }`,
            //     })
            // }
            // const datatApp = await axios(config);
            if(data?.getMaintenanceStatus?.status === 200) {
                dispatch({
                    type: GET_MAINTENANCE_STATUS_SUCCESS,
                    payload: data.getMaintenanceStatus.results,
                })
            }
        } catch (error) {
            toastr.error("Failed", error.message);
            dispatch({
                type: GET_MAINTENANCE_STATUS_ERROR,
            })
        }
    }
}
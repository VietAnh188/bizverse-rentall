import { default as axios } from "axios";
import { gql } from "react-apollo";
import {
  START_MAINTENANCE_ERROR,
  MAINTENANCE_START,
  START_MAINTENANCE_SUCCESS,
} from "../../constants";

axios.defaults.withCredentials = true;
export function startMaintenance({ type, startTime, endTime, description }) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: MAINTENANCE_START,
    });

    try {
      let mutation = gql`
        mutation startMaintenance(
          $type: MaintenanceEnumType
          $startTime: String
          $endTime: String
          $description: String
        ) {
          startMaintenance(
            type: $type
            startTime: $startTime
            endTime: $endTime
            description: $description
          ) {
            results {
              type
              startTime
              endTime
              description      
            }
            status
            errorMessage
          }
        }
      `;
      let mutationApp = `
        mutation startMaintenance(
            $type: MaintenanceEnumType,
            $startTime: String,
            $endTime: String,
            $description: String
        ){
            startMaintenance(type: $type, startTime: $startTime, endTime: $endTime, description: $description){
                results {
                    type
                    startTime
                    endTime
                    description
                }
                status
                errorMessage
            }
        }`
        if(type !== 'app') {
          const { data } = await client.mutate({
            mutation,
            variables: {
              type,
              startTime,
              endTime,
              description,
            },
          });
          if (data?.startMaintenance?.status === 200) {
            dispatch({
              type: START_MAINTENANCE_SUCCESS,
              payload: { statusMaintenance: true }
            });
          } else {
              dispatch({
                  type: START_MAINTENANCE_ERROR,
                  payload: { statusMaintenance: false, error: data.startMaintenance.errorMessage }
                });
          }
        } else {
          let config = {
              method: 'post',
              url: `/api/graphql`,
              data: JSON.stringify({
                  query: mutationApp,
                  variables: {
                      type, startTime, endTime, description
                  }
              })
          }
          const resp = await axios(config)
          const {data} = resp.data;
          
          if(data.startMaintenance.status === 200) {
                  dispatch({
                  type:"START_MAINTENANCE_APP_SUCCESS",
                  payload: data,
              })
          } else {
              dispatch({
                  type: START_MAINTENANCE_ERROR,
                  payload: data.startMaintenance.errorMessage
              })
          }
        }
    } catch (error) {
      dispatch({
        type: START_MAINTENANCE_ERROR,
        payload: {
            statusMaintenance: false,
          error,
        },
      });
    }
  };
}
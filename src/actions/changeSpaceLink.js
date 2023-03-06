import { gql } from 'react-apollo';

// Notification
import { toastr } from 'react-redux-toastr';

import {
  SAVE_SPACE_START,
  SAVE_SPACE_SUCCESS,
  SAVE_SPACE_ERROR,
  REMOVE_TYPE_SPACE_START,
  REMOVE_TYPE_SPACE_SUCCESS,
  REMOVE_TYPE_SPACE_ERROR,
  GET_SPACE_LINK_START,
  GET_SPACE_LINK_SUCCESS,
  GET_SPACE_LINKS_ERROR
} from '../constants';

const mutationAdd = gql`
  mutation(
    $listId: Int!, 
    $type: String!, 
    $title: String, 
    $url: String, 
    $fullLink: String) {
    createVRLink(
      listId: $listId,
      type: $type,
      title: $title,
      url: $url,
      fullLink: $fullLink
    ) {
      status
      errorMessage
      result {
        id
        listId
        type
        url
        fullLink
        title
      }
    }
  }
`;

const mutationRemove = gql`
  mutation ($id: Int) {
    deleteVRLink(id: $id) {
      status
    }
  }
`;

const query = gql`
query ($listId: String!, $type: String!) {
  getVRLink(listId: $listId, type:$type) {
    url
    id
    listId
    type
    title
    fullLink
  }
}
`;

export function saveSpaceLink({listId, type, title, url, fullLink}) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: SAVE_SPACE_START });
    
    try {
      const { data } = await client.mutate({
        mutation: mutationAdd,
        variables: {
          listId,
          type,
          title,
          url,
          fullLink
        },
        fetchPolicy: 'network-only'
      });

      if (data.createVRLink.status === 200) {
        dispatch({ type: SAVE_SPACE_SUCCESS, 
          payload: {
            linkItem: data.createVRLink.result,
          }
         });
      }
    } catch (error) {
      console.log('error', error)
      toastr.error("Failed to save form", "Sorry, something went wrong. Please try again!");
      dispatch({
        type: SAVE_SPACE_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}

export function removeSpaceLink(id) {
  return async (dispatch, getState, { client }) => {

    dispatch({ type: REMOVE_TYPE_SPACE_START });
    
    try {
      const { data } = await client.mutate({
        mutation: mutationRemove,
        variables: {
          id
        },
        fetchPolicy: 'network-only'
      });

      if (data.deleteVRLink.status === 200) {
        dispatch({ type: REMOVE_TYPE_SPACE_SUCCESS, 
          payload: {
            id,
          }
         });
      }
    } catch (error) {
      console.log('error', error)
      toastr.error("Failed to remove link", "Sorry, something went wrong. Please try again!");
      dispatch({
        type: REMOVE_TYPE_SPACE_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}

export function getSpaceLink(listId, type) {

  return async (dispatch, getState, { client }) => {

    dispatch({ type: GET_SPACE_LINK_START });
    
    try {
      const { data } = await client.query({
        query,
        variables: {
          listId,
          type
        },
        fetchPolicy: 'network-only'
      });

      if (data.getVRLink) {
        dispatch({ type: GET_SPACE_LINK_SUCCESS, 
          payload: {
            linkList: data.getVRLink,
          }
         });
      }
    } catch (error) {
      toastr.error("Failed to remove link", "Sorry, something went wrong. Please try again!");
      dispatch({
        type: GET_SPACE_LINKS_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}

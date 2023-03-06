import {
  OPEN_LIST_SETTINGS_MODAL,
  CLOSE_LIST_SETTINGS_MODAL,
  OPEN_ADMIN_ROLES_MODAL,
  CLOSE_ADMIN_ROLES_MODAL,
  OPEN_ADMIN_USER_MODAL,
  CLOSE_ADMIN_USER_MODAL,
  ADMIN_COMMENT_MODAL_SHOW,
  ADMIN_COMMENT_MODAL_HIDE,
  ADMIN_HISTORY_MODAL_SHOW,
  ADMIN_HISTORY_MODAL_HIDE
} from '../../constants';

export default function adminModalStatus(state = {}, action) {
  switch (action.type) {

    case OPEN_LIST_SETTINGS_MODAL:
      return {
        ...state,
        listSettingsModal: action.listSettingsModal,
      };

    case CLOSE_LIST_SETTINGS_MODAL:
      return {
        ...state,
        listSettingsModal: action.listSettingsModal
      };

    case OPEN_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: action.payload.adminRolesModalType
      };

    case CLOSE_ADMIN_ROLES_MODAL:
      return {
        ...state,
        adminRolesModal: action.payload.adminRolesModal,
        adminRolesModalType: null
      };

    case OPEN_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: action.payload.adminUserModalType
      };

    case CLOSE_ADMIN_USER_MODAL:
      return {
        ...state,
        adminUserModal: action.payload.adminUserModal,
        adminUserModalType: null
      };

    case ADMIN_COMMENT_MODAL_SHOW:
      return {
        ...state,
        commentModal: action.payload.commentModal,
        comment: action.payload.comment,
        listId: action.payload.listId,
      };

    case ADMIN_COMMENT_MODAL_HIDE:
      return {
        ...state,
        commentModal: action.payload.commentModal,
      };

    case ADMIN_HISTORY_MODAL_SHOW:
      return {
        ...state,
        historyModal: action.payload.historyModal,
        listingHistory: action.payload.listingHistory,
      };

    case ADMIN_HISTORY_MODAL_HIDE:
      return {
        ...state,
        historyModal: action.payload.historyModal,
      };

    default:
      return {
        ...state,
      };
  }
}

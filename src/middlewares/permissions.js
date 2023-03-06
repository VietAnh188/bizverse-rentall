
// rules function
import { allow, isMaintenanceMarketplace, isMaintenanceWeb } from "./rules";


// allow api site admin, startMaintenance, stopMaintenance
export const permissionsWeb = {
    query: {
      me: isMaintenanceWeb,
      news: isMaintenanceWeb,
      intl: isMaintenanceWeb,
      userLogin: allow,
      userLogout: isMaintenanceWeb,
      userRegister: isMaintenanceWeb,
      userAccount: isMaintenanceWeb,
      userEditProfile: isMaintenanceWeb,
      userManagement: allow,
      editUser: allow,
      updateUser: allow,
      showUserProfile: isMaintenanceWeb,
      adminUserLogin: allow,
      siteSettings: allow,
      updateSiteSettings: allow,
      locationItem: isMaintenanceWeb,
      createListing: isMaintenanceWeb,
      showListing: isMaintenanceWeb,
      updateListing: isMaintenanceWeb,
      showListingSteps: isMaintenanceWeb,
      addListSettings: allow,
      updateListSettings: allow,
      deleteListSettings: allow,
      getListingSettings: isMaintenanceWeb,
      UserListing: isMaintenanceWeb,
      getProfile: isMaintenanceWeb,
      getAdminListingSettings: allow,
      updateListingStep2: isMaintenanceWeb,
      updateListingStep3: isMaintenanceWeb,
      updateListingStep4: isMaintenanceWeb,
      ManageListingSteps: isMaintenanceWeb,
      ShowListPhotos: isMaintenanceWeb,
      DateAvailability: isMaintenanceWeb,
      getListingSpecSettings: isMaintenanceWeb,
      getCurrencies: isMaintenanceWeb,
      Currency: isMaintenanceWeb,
      ManageListings: isMaintenanceWeb,
      getAllListings: allow,
      SearchListing: isMaintenanceWeb,
      getBaseCurrency: isMaintenanceWeb,
      getPaymentInfo: isMaintenanceWeb,
      updatePaymentSettings: allow,
      StoreCurrencyRates: isMaintenanceWeb,
      updateSearchSettings: allow,
      getSearchSettings: isMaintenanceWeb,
      GetAddressComponents: isMaintenanceWeb,
      getLogo: allow,
      getCountries: isMaintenanceWeb,
      getBanner: isMaintenanceWeb,
      updateBannerSettings: allow,
      getRecommend: isMaintenanceWeb,
      getUserDashboard: allow,
      getListingDashboard: allow,
      getUserVerifiedInfo: isMaintenanceWeb,
      getImageBanner: isMaintenanceWeb,
      GetListViews: isMaintenanceWeb,
      GetMostViewedListing: isMaintenanceWeb,
      EmailVerification: isMaintenanceWeb,
      ResendConfirmEmail: isMaintenanceWeb,
      GetAllThreads: isMaintenanceWeb,
      getThread: isMaintenanceWeb,
      getUnreadThreads: isMaintenanceWeb,
      getUnreadCount: isMaintenanceWeb,
      getPaymentMethods: isMaintenanceWeb,
      getPayouts: isMaintenanceWeb,
      getItinerary: isMaintenanceWeb,
      getListReservation: isMaintenanceWeb,
      getAllReservation: isMaintenanceWeb,
      getReservation: isMaintenanceWeb,
      getAllReservationAdmin: isMaintenanceWeb,
      getPayoutStatus: isMaintenanceWeb,
      getTransactionHistory: isMaintenanceWeb,
      getServiceFees: isMaintenanceWeb,
      getPaymentData: isMaintenanceWeb,
      getAllThreadItems: isMaintenanceWeb,
      getAllCancellation: isMaintenanceWeb,
      getSpecificCancellation: isMaintenanceWeb,
      cancelReservationData: isMaintenanceWeb,
      userReviews: isMaintenanceWeb,
      pendingReviews: isMaintenanceWeb,
      writeReviewData: isMaintenanceWeb,
      moreListReviews: isMaintenanceWeb,
      forgotPasswordVerification: isMaintenanceWeb,
      getListingCalendars: isMaintenanceWeb,
      getBlockedDates: isMaintenanceWeb,
      getListMeta: isMaintenanceWeb,
      getAdminReviews: allow,
      editAdminReview: allow,
      getAllWishListGroup: isMaintenanceWeb,
      getWishListGroup: isMaintenanceWeb,
      viewReservationAdmin: isMaintenanceWeb,
      getSimilarListing: isMaintenanceWeb,
      getReservationDashboard: allow,
      ShowDocumentList: isMaintenanceWeb,
      getAllDocument: allow,
      showAllDocument: allow,
      getFooterSetting: allow,
      getAllMessageHistory: allow,
      getAllReport: allow,
      getPhoneData: isMaintenanceWeb,
      ManageListingsProfile: isMaintenanceWeb,
      getUserBanStatus: isMaintenanceWeb,
      ManageListingTransaction: isMaintenanceWeb,
      getPopularLocation: allow,
      editPopularLocation: allow,
      getUserStatus: isMaintenanceWeb,
      checkReservation: isMaintenanceWeb,
      getPopularLocationAdmin: allow,
      getListAvailableDates: isMaintenanceWeb,
      getSpecialPricing: isMaintenanceWeb,
      getUpcomingBookings: isMaintenanceWeb,
      getBlogDetails: isMaintenanceWeb,
      editBlogDetails: allow,
      getBlogHome: allow,
      getEnabledBlog: allow,
      getCheckUserStatus: isMaintenanceWeb,
      messageManagement: allow,
      reviewsManagement: allow,
      reportUserManagement: allow,
      getEditStaticPage: allow,
      getReviewsDetails: allow,
      editUserReviews: allow,
      getStepTwo: isMaintenanceWeb,
      getHomeLogo: allow,
      getStaticInfo: allow,
      getHomeBanner: isMaintenanceWeb,
      getEmailLogo: allow,
      getAllAdminRoles: allow,
      getAllAdminUsers: allow,
      getAdminUser: allow,
      getWhyHostPage: allow,
      getListSettings: allow,
      getAllPayoutReservation: isMaintenanceWeb,
      getFailedTransaction: isMaintenanceWeb,
      adminUserLogout: allow,
      checkListing: isMaintenanceWeb,
      getAllAdminListSettings: allow,
      getSideMenu: allow,
      getAllPermissionListings: allow,
      getSiteSettingsLogo: allow,
      getListBookedDates: isMaintenanceWeb,
      getOneFinPaymentStatus: isMaintenanceWeb,
      userWalletAddress: isMaintenanceWeb,
      getUserPayout: isMaintenanceWeb,
      checkNFTIsValid: isMaintenanceWeb,
      getNFTs: isMaintenanceWeb,
      // marketplace_getListingByNFT,
      checkListingHasNFT: isMaintenanceWeb,
      getTokenIdsByIDs: isMaintenanceWeb,
      getBurnNFTInformationBeforeCancel: isMaintenanceWeb,
      verifyQRCode: isMaintenanceWeb,
      getNFT: isMaintenanceWeb,
      getCheckInTimeline: isMaintenanceWeb,
      getListings: isMaintenanceWeb,
      // marketplace_getUserNFTs,
      // marketplace_getFavoriteNFTs,
      // marketplace_getNFTs,
      // marketplace_getUserActivities,
      // marketplace_getUserActivity,
      getCountry: isMaintenanceWeb,
      getMaintenanceStatus: allow,
      getVRLink: allow,
      adminGetAllNFTs: allow
    },
    mutation: {
        addRecommend: allow,
        removeRecommend: allow,
        ChangePassword: isMaintenanceWeb,
        updateUserVerifiedInfo: isMaintenanceWeb,
        UploadProfilePicture: isMaintenanceWeb,
        RemoveProfilePicture: isMaintenanceWeb,
        updateImageBanner: allow,
        uploadImageBanner: allow,
        // updateStaticInfoBlock,
        // uploadStaticInfoBlockImage,
        removeImageBanner: allow,
        UpdateListViews: isMaintenanceWeb,
        CreateThreadItems: isMaintenanceWeb,
        sendMessage: isMaintenanceWeb,
        readMessage: isMaintenanceWeb,
        addPayout: isMaintenanceWeb,
        removePayout: isMaintenanceWeb,
        setDefaultPayout: isMaintenanceWeb,
        createReservation: isMaintenanceWeb,
        updatePayoutForReservation: isMaintenanceWeb,
        updateServiceFees: isMaintenanceWeb,
        updateReservation: isMaintenanceWeb,
        managePaymentCurrency: isMaintenanceWeb,
        RemoveListing: isMaintenanceWeb,
        deleteUser: isMaintenanceWeb,
        adminRemoveListing: allow,
        adminTogglePublishListing: allow,
        currencyManagement: allow,
        baseCurrency: allow,
        uploadLogo: allow,
        removeLogo: allow,
        CreateListPhotos: isMaintenanceWeb,
        RemoveListPhotos: isMaintenanceWeb,
        cancelReservation: isMaintenanceWeb,
        writeReview: isMaintenanceWeb,
        sendForgotPassword: isMaintenanceWeb,
        changeForgotPassword: isMaintenanceWeb,
        managePublish: isMaintenanceWeb,
        changeAdminUser: allow,
        deleteCalendar: isMaintenanceWeb,
        blockImportedDates: isMaintenanceWeb,
        writeAdminReview: allow,
        deleteAdminReview: allow,
        CreateWishListGroup: isMaintenanceWeb,
        UpdateWishListGroup: isMaintenanceWeb,
        DeleteWishListGroup: isMaintenanceWeb,
        CreateWishLists: isMaintenanceWeb,
        uploadDocument: isMaintenanceWeb,
        CreateDocumentList: isMaintenanceWeb,
        RemoveDocumentList: isMaintenanceWeb,
        DocumentManagement: allow,
        CreateWishList: isMaintenanceWeb,
        CreateFooterSetting: allow,
        CreateReportUser: isMaintenanceWeb,
        AddPhoneNumber: isMaintenanceWeb,
        VerifyPhoneNumber: isMaintenanceWeb,
        RemovePhoneNumber: isMaintenanceWeb,
        updateBanServiceHistoryStatus: allow,
        deletePopularLocation: allow,
        updatePopularLocation: allow,
        updatePopularLocationStatus: allow,
        uploadLocation: allow,
        removeLocation: allow,
        addPopularLocation: allow,
        updateListStatus: isMaintenanceWeb,
        ListingDataUpdate: isMaintenanceWeb,
        UpdateBlockedDates: isMaintenanceWeb,
        deleteBlogDetails: allow,
        addBlogDetails: allow,
        updateBlogDetails: allow,
        updateBlogStatus: allow,
        updateStaticPage: allow,
        writeUserReview: allow,
        updateReview: allow,
        uploadHomeLogo: allow,
        removeHomeLogo: allow,
        addHomeBanner: allow,
        deleteHomeBanner: allow,
        uploadEmailLogo: allow,
        removeEmailLogo: allow,
        updateStaticBlockSettings: allow,
        uploadStaticBlock: allow,
        removeStaticImages: allow,
        RemoveBlockedDates: isMaintenanceWeb,
        createAdminRole: allow,
        deleteAdminRole: allow,
        createAdminUser: allow,
        deleteAdminUser: allow,
        sendContactEmail: isMaintenanceWeb,
        updateWhyHostPage: allow,
        updatePayoutStatus: isMaintenanceWeb,
        removeWhyHostImages: allow,
        updateSideMenu: allow,
        submitForVerification: isMaintenanceWeb,
        approveListing: isMaintenanceWeb,
        createListingHistory: isMaintenanceWeb,
        updateSiteSettingsLogo: allow,
        removeFavIconLogo: allow,
        onefinPayment: isMaintenanceWeb,
        cancelSubmitListing: isMaintenanceWeb,
        changeReservationStatus: isMaintenanceWeb,
        hostUpdatePayLaterStatus: isMaintenanceWeb,
        guestCancelPayLater: isMaintenanceWeb,
        guestPaymentOnlineForPayLaterReservation: isMaintenanceWeb,
        hostAcceptPaymentLater: isMaintenanceWeb,
        createNFT: isMaintenanceWeb,
        updateNFT: isMaintenanceWeb,
        burnNFTs: isMaintenanceWeb,
        // marketplace_removeNFT,
        pushNFTsToMarketplace: isMaintenanceWeb,
        pullNFTsOutMarketplace: isMaintenanceWeb,
        mintNFTFailed: isMaintenanceWeb,
        mintNFTSuccess: isMaintenanceWeb,
        claimNFT: isMaintenanceWeb,
        buyNFTCallback: isMaintenanceWeb,
        updatePhoto: isMaintenanceWeb,
        syncBizverseSocial: isMaintenanceWeb,
        guestMintNFT: isMaintenanceWeb,
        // marketplace_sellNFTSuccess,
        // toggleFavoriteNFT
        startMaintenance: allow,
        stopMaintenance: allow,
        cancelBooking: isMaintenanceWeb,
        checkIsNFTMinted: isMaintenanceWeb,
        createMultiLanguage: allow,
        updateMultiLanguage: allow,
        createVRLink: allow,
        deleteVRLink: allow,
        toggleTrendingNFT: allow
    },
}
export const permissionMarketplace =  {
    query: {
        userLogin: isMaintenanceMarketplace,
        userLogout: isMaintenanceMarketplace,
        marketplace_getUser: isMaintenanceMarketplace,
        marketplace_getListingByNFT: isMaintenanceMarketplace,
        marketplace_getUserNFTs: isMaintenanceMarketplace,
        marketplace_getFavoriteNFTs: isMaintenanceMarketplace,
        marketplace_getNFTs: isMaintenanceMarketplace,
        marketplace_getUserActivities: isMaintenanceMarketplace,
        marketplace_getUserActivity: isMaintenanceMarketplace,
        marketplace_checkNFTAvailable: isMaintenanceMarketplace,
        marketplace_getNFTCollection: isMaintenanceMarketplace,
        marketplace_getNFTCollections: isMaintenanceMarketplace,
        marketplace_getNFTsOfCollection: isMaintenanceMarketplace
    },
    mutation: {
        marketplace_removeNFT: isMaintenanceMarketplace,
        marketplace_sellNFTSuccess: isMaintenanceMarketplace,
        toggleFavoriteNFT: isMaintenanceMarketplace,
        marketplace_confirmTransactionStart: isMaintenanceMarketplace,
        marketplace_createNFTCollection: isMaintenanceMarketplace,
        marketplace_deleteNFTCollection: isMaintenanceMarketplace,
        marketplace_updateNFTCollection: isMaintenanceMarketplace,
        marketplace_addNFTsToCollection: isMaintenanceMarketplace,
        marketplace_removeNFTsOutCollection: isMaintenanceMarketplace
    },
}
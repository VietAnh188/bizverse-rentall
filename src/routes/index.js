
// The top-level (parent) route
export default {

  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => import(/* webpackChunkName: 'home' */ './home'),
    },
    {
      path: '/contact',
      load: () => import(/* webpackChunkName: 'contact' */ './contact'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/register',
      load: () => import(/* webpackChunkName: 'register' */ './register'),
    },
    {
      path: '/user/edit',
      load: () => import(/* webpackChunkName: 'editProfile' */ './editProfile'),
    },
    {
      path: '/admin',
      load: () => import(/* webpackChunkName: 'admin' */ './admin'),
    },
    {
      path: '/users/show/:profileId?',
      load: () => import(/* webpackChunkName: 'profile' */ './profile'),
    },
    {
      path: '/become-a-host/:listId?/:formPage?',
      load: () => import(/* webpackChunkName: 'becomeHost' */ './becomeHost'),
    },
    {
      path: '/rooms/:listId/:preview?',
      load: () => import(/* webpackChunkName: 'viewListing' */ './viewListing'),
    },
    {
      path: '/rooms',
      load: () => import(/* webpackChunkName: 'manageListing' */ './manageListing'),
    },
    {
      path: '/s',
      load: () => import(/* webpackChunkName: 'search' */ './search'),
    },
    {
      path: '/user/photo',
      load: () => import(/* webpackChunkName: 'profilePhoto' */ './profilePhoto'),
    },
    {
      path: '/user/verification',
      load: () => import(/* webpackChunkName: 'trustAndVerification' */ './trustAndVerification'),
    },
    {
      path: '/users/security',
      load: () => import(/* webpackChunkName: 'changePassword' */ './changePassword'),
    },
    {
      path: '/dashboard',
      load: () => import(/* webpackChunkName: 'dashboard' */ './dashboard'),
    },
    {
      path: '/inbox',
      load: () => import(/* webpackChunkName: 'inbox' */ './inbox'),
    },
    {
      path: '/message/:threadId/:type',
      load: () => import(/* webpackChunkName: 'viewMessage' */ './viewMessage'),
    },
    {
      path: '/book/:hostingId',
      load: () => import(/* webpackChunkName: 'book' */ './book'),
    },
    {
      path: '/user/payout',
      load: () => import(/* webpackChunkName: 'payout' */ './payout'),
    },
    {
      path: '/user/addpayout',
      load: () => import(/* webpackChunkName: 'addPayout' */ './addPayout'),
    },
    {
      path: '/payment/:reservationId',
      load: () => import(/* webpackChunkName: 'payment' */ './payment'),
    },
    {
      path: '/users/trips/itinerary/:reservationId',
      load: () => import(/* webpackChunkName: 'itinerary' */ './itinerary'),
    },
    {
      path: '/users/trips/receipt/:reservationId',
      load: () => import(/* webpackChunkName: 'receipt' */ './receipt'),
    },
    {
      path: '/reservation/:type',
      load: () => import(/* webpackChunkName: 'reservation' */ './reservation'),
    },
    {
      path: '/trips/:type',
      load: () => import(/* webpackChunkName: 'trips' */ './trips'),
    },
    {
      path: '/user/transaction',
      load: () => import(/* webpackChunkName: 'transaction' */ './transaction'),
    },
    {
      path: '/warning',
      load: () => import(/* webpackChunkName: 'warning' */ './warning'),
    },
    {
      path: '/cancel/:reservationId/:type',
      load: () => import(/* webpackChunkName: 'cancel' */ './cancel'),
    },
    {
      path: '/cancellation-policies/:type?',
      load: () => import(/* webpackChunkName: 'cancellationPolicies' */ './cancellationPolicies'),
    },
    {
      path: '/user/reviews',
      load: () => import(/* webpackChunkName: 'reviews' */ './reviews'),
    },
    {
      path: '/review/write/:reservationId',
      load: () => import(/* webpackChunkName: 'writeReview' */ './writeReview'),
    },
    {
      path: '/password/verification',
      load: () => import(/* webpackChunkName: 'passwordVerification' */ './passwordVerification'),
    },
    {
      path: '/userbanned',
      load: () => import(/* webpackChunkName: 'userbanned' */ './userbanned'),
    },
    {
      path: '/user/payout/failure',
      load: () => import(/* webpackChunkName: 'addPayoutFailure' */ './addPayoutFailure'),
    },

    //document upload
    {
      path: '/document-verification',
      load: () => import(/* webpackChunkName: 'documentVerification' */ './documentVerification'),
    },

    //blog
    {
      path: '/page/:u1?',
      load: () => import(/* webpackChunkName: 'blog' */ './blog'),
    },
    {
      path: '/siteadmin/content-management',
      load: () => import(/* webpackChunkName: 'siteadmin-blogManagement' */ './siteadmin/blogManagement'),
    },
    {
      path: '/siteadmin/page/add',
      load: () => import(/* webpackChunkName: 'siteadmin-addBlogDetails' */ './siteadmin/addBlogDetails'),
    },
    {
      path: '/siteadmin/edit/page/:blogId',
      load: () => import(/* webpackChunkName: 'siteadmin-editBlogDetails' */ './siteadmin/editBlogDetails'),
    },

    //Static Pages
    {
      path: '/about',
      load: () => import(/* webpackChunkName: 'static-about' */ './static/about'),
    },
    {
      path: '/privacy',
      load: () => import(/* webpackChunkName: 'static-privacy' */ './static/privacy'),
    },
    {
      path: '/help',
      load: () => import(/* webpackChunkName: 'static-help' */ './static/help'),
    },
    {
      path: '/safety',
      load: () => import(/* webpackChunkName: 'static-trustAndSafety' */ './static/trustAndSafety'),
    },
    {
      path: '/travel',
      load: () => import(/* webpackChunkName: 'static-travelCredit' */ './static/travelCredit'),
    },
    {
      path: '/whyhost-old',
      load: () => import(/* webpackChunkName: 'static-whyhost' */ './static/whyhost'),
    },
    {
      path: '/whyhost',
      load: () => import(/* webpackChunkName: 'whyhostnew' */ './whyhostnew'),
    },
    {
      path: '/cookie-policy',
      load: () => import(/* webpackChunkName: 'static-cookiePolicy' */ './static/cookiePolicy'),
    },

    //Add Admin Panel Pages Here
    {
      path: '/siteadmin',
      load: () => import(/* webpackChunkName: 'siteadmin-adminDashboard' */ './siteadmin/adminDashboard'),
    },
    {
      path: '/siteadmin/login',
      load: () => import(/* webpackChunkName: 'siteadmin-adminLogin' */ './siteadmin/adminLogin'),
    },
    {
      path: '/siteadmin/change/admin',
      load: () => import(/* webpackChunkName: 'siteadmin-changeAdmin' */ './siteadmin/changeAdmin'),
    },
    {
      path: '/siteadmin/user/edit/:profileId',
      load: () => import(/* webpackChunkName: 'siteadmin-edituser' */ './siteadmin/edituser'),
    },
    {
      path: '/siteadmin/users',
      load: () => import(/* webpackChunkName: 'siteadmin-users' */ './siteadmin/users'),
    },
    {
      path: '/siteadmin/settings/site',
      load: () => import(/* webpackChunkName: 'siteadmin-siteSettings' */ './siteadmin/siteSettings'),
    },
    {
      path: '/siteadmin/listsettings/:typeId',
      load: () => import(/* webpackChunkName: 'siteadmin-listSettings' */ './siteadmin/listSettings'),
    },
    {
      path: '/siteadmin/listings',
      load: () => import(/* webpackChunkName: 'siteadmin-listings' */ './siteadmin/listings'),
    },
    {
      path: '/siteadmin/nfts',
      load: () => import(/* webpackChunkName: 'siteadmin-listings' */ './siteadmin/nfts'),
    },
    {
      path: '/siteadmin/listingApproval',
      load: () => import(/* webpackChunkName: 'siteadmin-listingPermission' */ './siteadmin/listingPermission'),
    },
    {
      path: '/siteadmin/currency',
      load: () => import(/* webpackChunkName: 'siteadmin-currencies' */ './siteadmin/currencies'),
    },
    {
      path: '/siteadmin/settings/payment',
      load: () => import(/* webpackChunkName: 'siteadmin-paymentSettings' */ './siteadmin/paymentSettings'),
    },
    {
      path: '/siteadmin/settings/search',
      load: () => import(/* webpackChunkName: 'siteadmin-searchSettings' */ './siteadmin/searchSettings'),
    },
    {
      path: '/siteadmin/home/caption',
      load: () => import(/* webpackChunkName: 'siteadmin-bannerSettings' */ './siteadmin/bannerSettings'),
    },
    {
      path: '/siteadmin/home/banner',
      load: () => import(/* webpackChunkName: 'siteadmin-imageBanner' */ './siteadmin/imageBanner'),
    },
    {
      path: '/siteadmin/reservations',
      load: () => import(/* webpackChunkName: 'siteadmin-reservations' */ './siteadmin/reservations'),
    },
    {
      path: '/siteadmin/receipt/:reservationId',
      load: () => import(/* webpackChunkName: 'siteadmin-viewReceipt' */ './siteadmin/viewReceipt'),
    },
    {
      path: '/siteadmin/settings/servicefees',
      load: () => import(/* webpackChunkName: 'siteadmin-serviceFeesSettings' */ './siteadmin/serviceFeesSettings'),
    },
    {
      path: '/siteadmin/reviews',
      load: () => import(/* webpackChunkName: 'siteadmin-adminReviews' */ './siteadmin/adminReviews'),
    },
    {
      path: '/siteadmin/write-reviews',
      load: () => import(/* webpackChunkName: 'siteadmin-writeReview' */ './siteadmin/writeReview'),
    },
    {
      path: '/siteadmin/reviews/edit-review/:reviewId',
      load: () => import(/* webpackChunkName: 'siteadmin-editReview' */ './siteadmin/editReview'),
    },
    {
      path: '/siteadmin/viewreservation/:id/:type',
      load: () => import(/* webpackChunkName: 'siteadmin-viewreservation' */ './siteadmin/viewreservation'),
    },
    {
      path: '/siteadmin/home/footer-block',
      load: () => import(/* webpackChunkName: 'siteadmin-footerBlock' */ './siteadmin/footerBlock'),
    },
    {
      path: '/siteadmin/messages',
      load: () => import(/* webpackChunkName: 'siteadmin-messages' */ './siteadmin/messages'),
    },
    {
      path: '/siteadmin/reportUser',
      load: () => import(/* webpackChunkName: 'siteadmin-reportUser' */ './siteadmin/reportUser'),
    },
    {
      path: '/siteadmin/popularlocation',
      load: () => import(/* webpackChunkName: 'siteadmin-popularLocation' */ './siteadmin/popularLocation'),
    },
    {
      path: '/siteadmin/edit/popularlocation/:locationId',
      load: () => import(/* webpackChunkName: 'siteadmin-editPopularLocation' */ './siteadmin/editPopularLocation'),
    },
    {
      path: '/siteadmin/popularlocation/add',
      load: () => import(/* webpackChunkName: 'siteadmin-addPopularLocation' */ './siteadmin/addPopularLocation'),
    },
    {
      path: '/siteadmin/staticpage/management',
      load: () => import(/* webpackChunkName: 'siteadmin-staticPage' */ './siteadmin/staticPage'),
    },
    {
      path: '/siteadmin/edit/staticpage/:pageId',
      load: () => import(/* webpackChunkName: 'siteadmin-editStaticPage' */ './siteadmin/editStaticPage'),
    },
    {
      path: '/siteadmin/home/static-info-block',
      load: () => import(/* webpackChunkName: 'siteadmin-staticBlock' */ './siteadmin/staticBlock'),
    },
    {
      path: '/siteadmin/home/home-banner',
      load: () => import(/* webpackChunkName: 'siteadmin-homeBanner' */ './siteadmin/homeBanner'),
    },
    {
      path: '/siteadmin/viewpayout/:id/:type',
      load: () => import(/* webpackChunkName: 'siteadmin-viewPayout' */ './siteadmin/viewPayout'),
    },
    {
      path: '/siteadmin/profileView/:profileId?',
      load: () => import(/* webpackChunkName: 'siteadmin-profileView' */ './siteadmin/profileView'),
    },
    {
      path: '/siteadmin/document',
      load: () => import(/* webpackChunkName: 'siteadmin-document' */ './siteadmin/document'),
    },
    {
      path: '/siteadmin/user-reviews',
      load: () => import(/* webpackChunkName: 'siteadmin-userReviews' */ './siteadmin/userReviews'),
    },
    {
      path: '/siteadmin/management-reviews/:reviewId',
      load: () => import(/* webpackChunkName: 'siteadmin-userEditReviews' */ './siteadmin/userEditReviews'),
    },
    {
      path: '/siteadmin/admin-roles',
      load: () => import(/* webpackChunkName: 'siteadmin-adminRoles' */ './siteadmin/adminRoles'),
    },
    {
      path: '/siteadmin/admin-users',
      load: () => import(/* webpackChunkName: 'siteadmin-adminUser' */ './siteadmin/adminUser'),
    },
    {
      path: '/siteadmin/whyHost/Block1',
      load: () => import(/* webpackChunkName: 'siteadmin-whyHostBlock1' */ './siteadmin/whyHostPageSettings/whyHostBlock1'),
    },
    {
      path: '/siteadmin/whyHost/Block2',
      load: () => import(/* webpackChunkName: 'siteadmin-whyHostBlock2' */ './siteadmin/whyHostPageSettings/whyHostBlock2'),
    },
    {
      path: '/siteadmin/whyHost/Block3',
      load: () => import(/* webpackChunkName: 'siteadmin-whyHostBlock3' */ './siteadmin/whyHostPageSettings/whyHostBlock3'),
    },
    {
      path: '/siteadmin/whyHost/Block4',
      load: () => import(/* webpackChunkName: 'siteadmin-whyHostBlock4' */ './siteadmin/whyHostPageSettings/whyHostBlock4'),
    },
    {
      path: '/siteadmin/whyHost/Block5',
      load: () => import(/* webpackChunkName: 'siteadmin-whyHostBlock5' */ './siteadmin/whyHostPageSettings/whyHostBlock5'),
    },
    {
      path: '/siteadmin/whyHost/Block6',
      load: () => import(/* webpackChunkName: 'siteadmin-whyHostBlock6' */ './siteadmin/whyHostPageSettings/whyHostBlock6'),
    },
    {
      path: '/siteadmin/whyHost/Block7',
      load: () => import(/* webpackChunkName: 'siteadmin-whyHostBlock7' */ './siteadmin/whyHostPageSettings/whyHostBlock7'),
    },
    {
      path: '/siteadmin/payout',
      load: () => import(/* webpackChunkName: 'siteadmin-payoutManagement' */ './siteadmin/payoutManagement'),
    },
    {
      path: '/siteadmin/failed-payout/:id',
      load: () => import(/* webpackChunkName: 'siteadmin-failedPayout' */ './siteadmin/failedPayout'),
    },
    {
      path: '/siteadmin/static-block',
      load: () => import(/* webpackChunkName: 'siteadmin-becomeHostStaticBlock' */ './siteadmin/becomeHostStaticBlock'),
    },
    {
      path: '/siteadmin/listing-request',
      load: () => import(/* webpackChunkName: 'listing-request' */ './siteadmin/listingPermission'),
    },

    //Wish Lists
    {
      path: '/wishlists/:id?',
      load: () => import(/* webpackChunkName: 'wishLists' */ './wishLists'),
    },

    // OneFin payment request response page
    {
      path: '/onefin-response',
      load: () => import(/* webpackChunkName: 'wishLists' */ './oneFinResponse'),
    },
    {
      path: '/app/onefin-response',
      load: () => import(/* webpackChunkName: 'wishLists' */ './oneFinResponse/app'),
    },

    {
      path: '/nft/inventory',
      load: () => import('./inventory'),
    },
    
    {
      path:'/nft/create',
      load: () => import('./createNFT')
    },

    {
      path:'/nft/marketplace',
      load: () => import('./nftMarketplace')
    },

    {
      path:'/nft/:id',
      load: () => import('./nftDetail')
    },

    {
      path: '/checkIn-timeline/host',
      load: () => import('./checkInTimeline/host'),
    },
    
    {
      path: '/checkIn-timeline/guest',
      load: () => import('./checkInTimeline/guest'),
    },
    
    {
      path: '/maintenance',
      load: () => import('./maintenance'),
    },
    
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'notFound' */ './notFound'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    let route = await next();
    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },

};

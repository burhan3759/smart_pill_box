// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
Parse.initialize("mbhEIUCTuXWiXuqavy6Hx5G1kiP0IxH9ggONMIdU", "gnFLSBV0Ksyj9ZlCOULMNNmGdI9s2W3OHdyNlsPh");  


angular.module('starter', ['ionic','ionic.service.core','ionic.service.push','ngCordova', 'starter.controllers', 'starter.services','starter.login', 'starter.pillBoxMode',  'starter.pairing'])
.run(function($ionicPlatform, $cordovaDeviceMotion, $state, $ionicPush) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });

  $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        // console.log(notification);
        return true;
      }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  var route = '/start';
  console.log(route);
  var currentUser = Parse.User.current();

  if (currentUser) {
    console.log("logged in");
    route = '/tab/dash';
  } else {
    console.log("not logged in");
  }
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('start', {
    url: '/start',
    templateUrl: 'templates/start.html',
    controller: 'MainCtrl',
  })

  .state('pairing', {
    url: '/pairing',
    templateUrl: 'templates/pairing.html',
    controller: 'PairCtrl',
  })

  .state('pillboxmode', {
    url: '/pillboxmode',
    templateUrl: 'templates/pillboxmode.html',
    controller: 'PillboxCtrl',
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',    
    templateUrl: 'templates/login.html',
    controller: 'userCtrl'
  })
  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'userCtrl'
  })
  .state('tab.setting', {
    url: '/setting',
    views: {
      'tab-setting': {
        templateUrl: 'templates/tab-setting.html',
        controller: 'SettingCtrl'
      }
    }
  })
  .state('tab.setting-pairing', {
    url: '/setting/pairing',
    views: {
      'tab-setting': {
        templateUrl: 'templates/tab-setting-pairing.html',
        controller: 'PairingCtrl'
      }
    }
  })

    .state('tab.setReminder', {
      url: '/reminder',
      views: {
        'tab-dash': {
          templateUrl: 'templates/setReminder.html',
          controller: 'ReminderCtrl'
        }
      }
    })
    .state('tab.setPillReminder', {
      url: '/setPillReminder',
      views: {
        'tab-dash': {
          templateUrl: 'templates/setPillReminder.html',
          controller: 'MainCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(route);
});

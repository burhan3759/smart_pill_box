// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.login'])

.run(function($ionicPlatform) {
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

  Parse.initialize("mbhEIUCTuXWiXuqavy6Hx5G1kiP0IxH9ggONMIdU", "gnFLSBV0Ksyj9ZlCOULMNNmGdI9s2W3OHdyNlsPh");  
  // var currentUser = Parse.User.current();

  //User logged in or not sample
  // $rootScope.user = null;
  // $rootScope.isLoggedIn = false;

  // if (currentUser) {
  //   $rootScope.user = currentUser;
  //   $rootScope.isLoggedIn = true;
  //   $state.go('app.home');
  // }

  //Parse connection test.
  // var TestObject = Parse.Object.extend("TestObject");
  // var testObject = new TestObject();
  // testObject.save({foo: "bar"}).then(function(object) {
  //   alert("yay! it worked");
  // });

})

.config(function($stateProvider, $urlRouterProvider) {

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

  .state('tab.login', {
      url: '/login',
      views: {
        'tab-user': {
          templateUrl: 'templates/login.html',
          controller: 'userCtrl'
        }
      }
  })
  .state('tab.signup', {
      url: '/signup',
      views: {
        'tab-user': {
          templateUrl: 'templates/signup.html',
          controller: 'userCtrl'
        }
      }
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
        templateUrl: 'templates/tab-setting-pairing.html'
        // controller: 'SettingCtrl'
      }
    }
  })

    .state('tab.setReminder', {
      url: '/reminder',
      views: {
        'tab-chats': {
          templateUrl: 'templates/setReminder.html',
          controller: 'ReminderCtrl'
        }
      }
    })
    .state('tab.setPillReminder', {
      url: '/setPillReminder',
      views: {
        'tab-chats': {
          templateUrl: 'templates/setPillReminder.html',
          controller: 'ReminderCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/start');

});

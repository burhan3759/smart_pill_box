angular.module('starter.controllers', ['ionic', 'ionic-timepicker'])

.controller('DashCtrl', function($rootScope, $scope, $ionicUser, $ionicPush, $cordovaPush) {
  $scope.done = function() {
    return true;
  };

  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });

  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $ionicUser.generateGUID();
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: 'Ionitron',
      bio: 'I come from planet Ion'
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
      alert.log('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');
    alert('Ionic Push: Registering user');


    // Register with the Ionic Push service.  All parameters are optional.
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
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
   Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
 $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
   enableFriends: true
 };
})



.controller ('ReminderCtrl', function ( ) {

})

.controller('SettingCtrl', function($scope,$state) {

  $scope.logout = function(){

   Parse.User.logOut();
   $state.go('tab.login');

    Parse.User.logOut();

    $state.go('login');

    $state.go('start');

  };
}) 

.controller('PushControl', function($scope) {
parsePlugin.initialize(appId, clientKey, function() {

    parsePlugin.subscribe('SampleChannel', function() {

        parsePlugin.getInstallationId(function(id) {

            
             var install_data = {
                installation_id: id,
                channels: ['SampleChannel']
             }

        }, function(e) {
            alert('error');
        });

    }, function(e) {
        alert('error');
    });

}, function(e) {
    alert('error');
}) 

}) 





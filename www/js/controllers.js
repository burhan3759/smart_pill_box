angular.module('starter.controllers', ['ionic', 'ionic-timepicker'])

.controller('DashCtrl', function($scope) {

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





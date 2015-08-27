angular.module('starter.controllers', [])

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

.controller('PillboxCtrl', function($scope) {

})

.controller('PairCtrl', function($scope) {
  var a = (Math.floor(1000 + Math.random() * 9000)).toString();
  $scope.code = a.substring(-2);
}) 

.controller ('ReminderCtrl', function () {

})

.controller('SettingCtrl', function($scope,$state) {

  $scope.logout = function(){
    Parse.User.logOut();
    $state.go('tab.login');
  }
  
})

.controller('MotionCtrl', function($scope, $cordovaDeviceMotion) {
  document.addEventListener("deviceready", function () {

    $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
      var X = result.x;
      var Y = result.y;
      var Z = result.z;
      var timeStamp = result.timestamp;
    }, function(err) {
      // An error occurred. Show a message to the user
    });

  }, false);


  // watch Acceleration
  var options = { frequency: 20000 };

  document.addEventListener("deviceready", function () {

    var watch = $cordovaDeviceMotion.watchAcceleration(options);
    watch.then(
      null,
      function(error) {
      // An error occurred
      },
      function(result) {
        var X = result.x;
        var Y = result.y;
        var Z = result.z;
        var timeStamp = result.timestamp;
    });


    watch.clearWatch();
    // OR
    $cordovaDeviceMotion.clearWatch(watch)
      .then(function(result) {
        // success
        }, function (error) {
        // error
      });

  }, false);
});


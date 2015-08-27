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
    $state.go('start');
  };
  
})

.controller('MainCtrl', function($state, $scope, $ionicModal) {
  $scope.loggedIn = function() {
    var currentUser = Parse.User.current();
    if (currentUser) {
      $state.go('tab.dash');
    } else {
      $state.go('login');
    }
  };

  $ionicModal.fromTemplateUrl('reminderEdit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  

  $scope.openModal = function() {
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove(); 
  })
  $scope.timePickerObject = {
    inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
    step: 1,  //Optional
    format: 12,  //Optional
    titleLabel: '12-hour Format',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Cancel',  //Optional
    setButtonType: 'button-positive',  //Optional
    closeButtonType: 'button-stable',  //Optional
  callback: function (val) {    //Mandatory
    $scope.timePickerCallback(val);

  }
};

  $scope.data={};

  $scope.noOfPills = function(){
      console.log($scope.data.pills);
  };

  $scope.timePickerCallback = function(time){
      if (typeof (time) === 'undefined') {
    console.log('Time not selected');
  } else {
    var selectedTime = new Date(time * 1000);
    console.log('Selected epoch is : ', time, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
  }
  };

 });


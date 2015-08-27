angular.module('starter.mainCtrl', ['ionic-timepicker'])

.controller('MainCtrl', function($scope, $ionicModal) {


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
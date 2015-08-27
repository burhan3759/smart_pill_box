angular.module('starter.mainCtrl', ['ionic-timepicker'])

.controller('MainCtrl', function($scope, $ionicModal) {

  $scope.days = [{id: '1' ,day:'Monday'},{id: '2' ,day:'Tuesday'},{id: '3' ,day:'Wednesday'},{id: '4' ,day:'Thursday'},{id: '5' ,day:'Friday'},{id: '6' ,day:'Saturday'},{id: '7' ,day:'Sunday'}];

  $scope.monday = {id: '1' ,day:'Monday'};
  $scope.tuesday = {id: '2' ,day:'Tuesday'};
  $scope.wednesday = {id: '3' ,day:'Wednesday'};
  $scope.thursday = {id: '4' ,day:'Thursday'};
  $scope.friday = {id: '5' ,day:'Friday'};
  $scope.saturday = {id: '6' ,day:'Saturday'};
  $scope.sunday = {id: '7' ,day:'Sunday'};

  $scope.addMore = function(day) {
    var newItemNo = $scope.monday.length + 1;
    $scope.monday.push({
      'id': 'ID' + newItemNo,
    });
  };

  $ionicModal.fromTemplateUrl('reminderEdit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  
  // $scope.selectedDay = {};
  $scope.openModal = function(day) {
    $scope.modal.show();
    console.log(day);
    // if(day.id === '1'){ $scope.selectedDay = $scope.monday}
    // else if(day.id === '2'){ day = $scope.tuesday}
    // else if(day.id === '3'){  day = $scope.wednesday}
    // else if(day.id === '4'){  day = $scope.thursday}
    // else if(day.id === '5'){  day = $scope.friday}
    // else if(day.id === '6'){  day = $scope.saturday}
    // else if(day.id === '7'){  day = $scope.sunday}
    $scope.selectedDay = day;

    if($scope.selectedDay.id === '1'){ $scope.selectedDay = $scope.monday; $scope.selectedDay.id = ($scope.selectedDay.id)}
    else if($scope.selectedDay.id === '2'){ $scope.selectedDay = $scope.tuesday; $scope.selectedDay.id = ($scope.selectedDay.id)}
    else if($scope.selectedDay.id === '3'){  $scope.selectedDay = $scope.wednesday; $scope.selectedDay.id = ($scope.selectedDay.id)}
    else if($scope.selectedDay.id === '4'){  $scope.selectedDay = $scope.thursday; $scope.selectedDay.id = ($scope.selectedDay.id)}
    else if($scope.selectedDay.id === '5'){  $scope.selectedDay = $scope.friday; $scope.selectedDay.id = ($scope.selectedDay.id)}
    else if($scope.selectedDay.id === '6'){  $scope.selectedDay = $scope.saturday; $scope.selectedDay.id = ($scope.selectedDay.id)}
    else if($scope.selectedDay.id === '7'){  $scope.selectedDay = $scope.sunday; $scope.selectedDay.id = ($scope.selectedDay.id)}
    console.log("selectedDay: " + $scope.selectedDay + " monday: " + $scope.monday);
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  }

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

  // $scope.data={};

  // $scope.noOfPills = function(){
  //     console.log($scope.data.pills);
  // };

  $scope.timePickerCallback = function(time){
    if (typeof (time) === 'undefined') {
      console.log('Time not selected');
    } else {
      var selectedTime = new Date(time * 1000);
      console.log('Selected epoch is : ', time, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
    }
  };

 });
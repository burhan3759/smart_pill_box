angular.module('starter.mainCtrl', ['ionic-timepicker'])

.controller('MainCtrl', function($scope, $ionicModal) {

  $scope.days = [{id: '1' ,day:'Monday'},{id: '2' ,day:'Tuesday'},{id: '3' ,day:'Wednesday'},{id: '4' ,day:'Thursday'},{id: '5' ,day:'Friday'},{id: '6' ,day:'Saturday'},{id: '7' ,day:'Sunday'}];

  $scope.monday = [{id: '1' ,day:'Monday',}];
  $scope.tuesday = [{id: '2' ,day:'Tuesday'}];
  $scope.wednesday = [{id: '3' ,day:'Wednesday'}];
  $scope.thursday = [{id: '4' ,day:'Thursday'}];
  $scope.friday = [{id: '5' ,day:'Friday'}];
  $scope.saturday = [{id: '6' ,day:'Saturday'}];
  $scope.sunday = [{id: '7' ,day:'Sunday'}];

  $scope.addMore = function(day) {
      var newItemNo = day.length + 1;
      day.push({
        'id': newItemNo,
      });   
  };

  $scope.remove = function(day, idx) {
    var i = day.indexOf(idx);
    day.splice(i, 1);   
  };


  $ionicModal.fromTemplateUrl('reminderEdit.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  
  
  $scope.openModal = function(day) {
    console.log(day);
    var num1 = $scope.monday.length - 1;
    var num2 = $scope.tuesday.length - 1;
    var num3 = $scope.wednesday.length - 1;
    var num4 = $scope.thursday.length - 1;
    var num5 = $scope.friday.length - 1;
    var num6 = $scope.saturday.length - 1;
    var num7 = $scope.sunday.length - 1;
    $scope.modal.show();
    if(day.id === '1'){ $scope.selectedDay = $scope.monday[num1]; $scope.arr = $scope.monday;}
    else if(day.id === '2'){ $scope.selectedDay = $scope.tuesday[num2]; $scope.arr = $scope.tuesday;}
    else if(day.id === '3'){  $scope.selectedDay = $scope.wednesday[num3]; $scope.arr = $scope.wednesday;}
    else if(day.id === '4'){  $scope.selectedDay = $scope.thursday[num4]; $scope.arr = $scope.thursday;}
    else if(day.id === '5'){  $scope.selectedDay = $scope.friday[num5]; $scope.arr = $scope.friday;}
    else if(day.id === '6'){  $scope.selectedDay = $scope.saturday[num6]; $scope.arr = $scope.saturday;}
    else if(day.id === '7'){  $scope.selectedDay = $scope.sunday[num7]; $scope.arr = $scope.sunday;}
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
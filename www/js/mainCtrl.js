angular.module('starter.mainCtrl', ['angular-datepicker','ionic-timepicker.templates'])

.controller('MainCtrl', function($scope, $ionicModal) {

  $scope.days = [{id: '1' ,day:'Monday'},{id: '2' ,day:'Tuesday'},{id: '3' ,day:'Wednesday'},{id: '4' ,day:'Thursday'},{id: '5' ,day:'Friday'},{id: '6' ,day:'Saturday'},{id: '7' ,day:'Sunday'}];

  $scope.monday = [{id: '1' ,day:'Monday',hours: '9', minutes: '0', meridian: 'AM'}];
  $scope.tuesday = [{id: '1' ,day:'Tuesday',hours: '8', minutes: '30', meridian: 'AM'}];
  $scope.wednesday = [{id: '1' ,day:'Wednesday',hours: '9', minutes: '0', meridian: 'AM'}];
  $scope.thursday = [{id: '1' ,day:'Thursday',hours: '9', minutes: '0', meridian: 'AM'}];
  $scope.friday = [{id: '1' ,day:'Friday',hours: '9', minutes: '0', meridian: 'AM'}];
  $scope.saturday = [{id: '1' ,day:'Saturday',hours: '9', minutes: '0', meridian: 'AM'}];
  $scope.sunday = [{id: '1' ,day:'Sunday',hours: '9', minutes: '0', meridian: 'AM'}];

  $scope.addMore = function(day) {
      var newItemNo = day.length + 1;
      day.push({
        'id': newItemNo,
        'hours': 9,
        'minutes': 0,
        'meridian': 'AM'
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


  $scope.saveToParse = function() {

  $scope.pid = JSON.parse(localStorage[':pid'] || '{}');
  $scope.uid = JSON.parse(localStorage[':uid'] || '{}');
  console.log($scope.pid);
  var Pillbox = Parse.Object.extend("Pillbox");
  var pillbox = new Pillbox;
  // pillbox.equalTo("Pid",$scope.pid);
  // exercises.id = $scope.ExisitingExerciseID;
  // console.log($scope.monday[1].amount);
    pillbox.set("Pid", $scope.pid);
    pillbox.set("User", Parse.User.current());
    pillbox.set("Monday", $scope.monday);
    pillbox.set("Tuesday", $scope.tuesday);
    pillbox.set("Wednesday", $scope.wednesday);
    pillbox.set("Thursday", $scope.thursday);
    pillbox.set("Friday", $scope.friday);
    pillbox.set("Saturday", $scope.saturday);
    pillbox.set("Sunday", $scope.sunday);

    pillbox.save(null, {
          success: function(pillbox) {
            // Execute any logic that should take place after the object is saved.
            alert("done");
          },  
          error: function(pillbox, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            console.log('Failed to create new object, with error code: ' + error.message);
          }
    });
  }
  $scope.time = {};
  
  $scope.increaseHours = function(day){
    day.hours = Number(day.hours);
    day.hours += 1;  
    if(day.hours === 13){
      day.hours = 1;
    }
  }

  $scope.decreaseHours = function(day){
    day.hours = Number(day.hours)
    day.hours -= 1;  
    if(day.hours === 0){
      day.hours = 12;
    }
  }
  $scope.time.minutes = 0;
  $scope.increaseMinutes = function(day){
    day.minutes = Number(day.minutes);
    day.minutes += 1;
    if(day.minutes === 60){
      day.minutes = 0;
    } 
  }

  $scope.decreaseMinutes = function(day){
    day.minutes = Number(day.minutes);
    day.minutes -= 1;
    if(day.minutes === -1){
      day.minutes = 59;
    } 
  }

  $scope.time.meridian = "AM";
  $scope.changeMeridian = function(day){
    if(day.meridian === "AM"){
      day.meridian = "PM";
    }else{
      day.meridian = "AM";
    }
  }
 });
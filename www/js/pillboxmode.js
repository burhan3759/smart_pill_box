angular.module('starter.pillBoxMode', [])

.controller('PillboxCtrl', function($scope, $cordovaDeviceMotion) {
    //Motion sensing stuff
    // document.addEventListener("deviceready", function () {
  
    //   $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
    //     var X = result.x;
    //     var Y = result.y;
    //     var Z = result.z;
    //     var timeStamp = result.timestamp;
    //   }, function(err) {
    //     // An error occurred. Show a message to the user
    //   });
  
    // }, false);
  
  
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
          $scope.accel.X = result.x;
          $scope.accel.Y = result.y;
          $scope.accel.Z = result.z;
          $scope.accel.timeStamp = result.timestamp;
      });
  
  
      // watch.clearWatch();
      // // OR
      // $cordovaDeviceMotion.clearWatch(watch)
      //   .then(function(result) {
      //     // success
      //     }, function (error) {
      //     // error
      //   });
  
    }, false);
})

.controller('PairCtrl', function($scope) {
  if (localStorage[':DID'] != undefined) {
    //Get from localStorage
    console.log("not empty");
    $scope.code = JSON.parse(localStorage[':DID'] || '{}');
  } else {
    console.log("empty");
    //Generate random number
    var a = (Math.floor(1000 + Math.random() * 9000)).toString();
    $scope.code = a.substring(-2);
    //Store in localStorage
    localStorage[':DID'] = JSON.stringify($scope.code);

    var Pillbox = Parse.Object.extend("Pillbox");
    var pillbox = new Pillbox();
    
    pillbox.set("Pid", $scope.code);

    pillbox.save(null, {
      success: function(pillbox) {
        // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + pillbox.id);
      },
      error: function(pillbox, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }

  $scope.clear = function() {
    window.localStorage.clear();
    window.location.reload(true);
  };
});

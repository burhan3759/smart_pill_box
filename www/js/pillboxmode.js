angular.module('starter.pillBoxMode', [])

.controller('PillboxCtrl', function($ionicPlatform, $scope, $cordovaDeviceMotion) {

  $ionicPlatform.ready(function() {
    $scope.accel = {};

    var options = {
      frequency: 200
    };

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

        $scope.accel = {
          X: X,
          Y: Y,
          Z: Z,
        };
      });
  });
})

.controller('PairCtrl', function($scope) {
  if (localStorage[':DID'] !== undefined) {
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
        localStorage['idUploadStatus'] = JSON.stringify(false);
      }
    });
  }

  $scope.clear = function() {
    window.localStorage.clear();
    window.location.reload(true);
  };
});

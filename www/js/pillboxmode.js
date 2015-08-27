angular.module('starter.pillBoxMode', [])

.controller('PillboxCtrl', function($ionicPlatform, $scope, $cordovaDeviceMotion) {

  var options = { frequency: 20000 };

  $ionicPlatform.ready(function() {
    console.log($cordovaDeviceMotion);

    $scope.getXYZ = function() {
      $cordovaDeviceMotion.getCurrentAcceleration().then(function(result) {
        console.log("inside");
        var X = result.x;
        var Y = result.y;
        var Z = result.z;
        var timeStamp = result.timestamp;
        alert(x+y+z);
      }, function(err) {
        // An error occurred. Show a message to the user
      });
    };
    
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

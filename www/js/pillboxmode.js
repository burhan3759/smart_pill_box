angular.module('starter.pillBoxMode', [])
.controller('PairCtrl', function($scope, $state) {
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

  //Execute code every 5 second
  var myTimer = setInterval(function() {
    console.log("code runnned");
    var Question = Parse.Object.extend("Pillbox");
    var query = new Parse.Query(Question);
    query.equalTo("Pid",$scope.code);
    query.first({
      success: function(object) {
        // Successfully retrieved the object.
        if(object !== undefined){
          console.log("Retrieved object from parse " + object.get('Pid'));
          clearInterval(myTimer);
        }

        if(object.get('User') !== undefined){
          console.log("Retrieved object from parse " + object.get('User'));
          $state.go('pillboxmode');
        } else {
          console.log("Not paired with any user");
        }
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
    });
  }, 3000);


  $scope.clear = function() {
    window.localStorage.clear();
    window.location.reload(true);
  };
})

.controller('PillboxCtrl', function($scope, $ionicPlatform, $cordovaMedia, $cordovaDeviceMotion) {
  $scope.code = JSON.parse(localStorage[':DID']);

  $scope.play = function(src) {
    var media = new Media(src);
    // $cordovaMedia.play(media);
    media.play();
  }

  $ionicPlatform.ready(function() {

  //   var src = "Ding.mp3";
  // var media = $cordovaMedia.newMedia(src);


  // // var iOSPlayOptions = {
  // //   numberOfLoops: 2,
  // //   playAudioWhenScreenIsLocked : false
  // // };

  // // media.play(options); // iOS only!
  // $scope.play = function () {
  //   console.log("playsound");
  //   media.play(); // Android
  // };

//   function playAudio(url) {
//     // Play the audio file at url
//     var my_media = new Media(url,
//         // success callback
//         function () { console.log("playAudio():Audio Success"); },
//         // error callback
//         function (err) { console.log("Error: "+err); }
//     );

//     // Play audio
//     my_media.play();

//     // Pause after 10 seconds
//     setTimeout(function () {
//         media.pause();
//     }, 10000);
// }

// playAudio('Ding.mp3');

    $scope.accel = {};

    var options = {
      frequency: 1000
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
        if (X > 1.0) {
          $scope.test = true;
        } else {
          $scope.test = false;
        }

      });
  });
});

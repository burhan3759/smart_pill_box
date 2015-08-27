angular.module('starter.pairing', [])

.controller('PairingCtrl',function($scope,$state){

	$scope.data = {};
	// var pid = JSON.stringify($scope.data);
	$scope.checkID = function(){
		  //get PID = pill unique id
	  var Question = Parse.Object.extend("Pillbox");
	  var query = new Parse.Query(Question);
	  query.equalTo("Pid",$scope.data.pillId);
	  query.first({
	  	success: function(object) {
	      // Successfully retrieved the object.
	      if(object !== undefined){
	      	console.log("Retrieved object from parse " + object.get('Pid'));
		    $scope.Pillbox = object;
		    $scope.pid = object.get('Pid');

		    object.set("User", Parse.User.current());
			object.save();


		    $state.go('tab.setPillReminder');
	      } else {
	      	$scope.msg = "Code did not Match!!";
	      }
	      
		},
		error: function(error) {
		  console.log("Error: " + error.code + " " + error.message);
		}
	  });
	};

  $scope.saveToParse = function(Pillbox) {

	var Exercises = Parse.Object.extend("Exercises");
	var exercises = new Exercises();
	exercises.id = $scope.ExisitingExerciseID;
	console.log($scope.ExisitingExerciseID);

		exercises.fetch()
		.then(function(){
		      exercises.set({ObjectId: Pillbox.objID,
		          Pid: Pillbox.pID,
		          Monday: Pillbox.monday,
		          Tueday: Pillbox.tuesday,
		          Wednesday: Pillbox.wednesday,
		          Thursday: Pillbox.thursday,
		          Friday: Pillbox.friday,
		          Saturday: Pillbox.saturday,
		          Sunday: Pillbox.sunday,
		          images: $scope.images})

		      return exercises.save();
		       $state.go('app.exercises', {clear: true});

		})
	}

})
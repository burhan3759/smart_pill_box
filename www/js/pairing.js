angular.module('starter.pairing', [])

.controller('PairCtrl',function($scope,$state){

	$scope.data = {};

	var pid = JSON.stringify($scope.data);


	  //get PID = pill unique id
	  var Question = Parse.Object.extend("Pillbox");
	  var query = new Parse.Query(Question);
	  query.equalTo("Pid", "3389");
		//   query.descending("createdAt");
	  // query.startsWith("Pid", "aasdas");
	  query.first({
	  	success: function(object) {
	      // Successfully retrieved the object.
	      console.log("Retrieved object from parse " + object.get('Pid'));
	  },
	  error: function(error) {
	  	console.log("Error: " + error.code + " " + error.message);
	  }
	});

  $scope.saveToParse = function(exercise) {

	var Exercises = Parse.Object.extend("Exercises");
	var exercises = new Exercises();
	exercises.id = $scope.ExisitingExerciseID;
	console.log($scope.ExisitingExerciseID);

		exercises.fetch()
		.then(function(){
		      exercises.set({exerciseName: exercise.ExerciseName,
		          exerciseID: exercise.ExerciseID,
		          exerciseDescription: exercise.Description,
		          sets: exercise.Sets,
		          reps: exercise.Reps,
		          resistance: exercise.Resistance,
		          tempo: exercise.Tempo,
		          images: $scope.images})

		      return exercises.save();
		       $state.go('app.exercises', {clear: true});

		})
	}

})
angular.module('starter.login', [])

.controller('userCtrl',function($scope, $state){
	$scope.user = {};

    $scope.login = function() {	
	  Parse.User.logIn($scope.user.username, $scope.user.password, {
	    success: function(user) {
	  		alert("success!");
	  		$state.go('tab.dash');
	    },error: function(user, error) {
	      // The login failed. Check error to see why.
	      alert(error);
	    }
	  });
	};

	//login code end

	//signup code begin
	$scope.signupEmail = function(){

		
	  if($scope.user.password != $scope.user.confirmPassword){
	  	$scope.msg = "Please enter same password!!";
	  	console.log("conpas " + $scope.user.confirmPassword + " pas: "+$scope.user.password);
	  }else{
	  	$scope.msg = "";
		  //Create a new user on Parse
		  var user = new Parse.User();
		  user.set("username", $scope.user.username);
		  user.set("password", $scope.user.password);
		  user.set("email", $scope.user.email);
		 
		  // other fields can be set just like with Parse.Object
		  user.set("somethingelse", "like this!");
		 
		  user.signUp(null, {
		    success: function(user) {
		      // Hooray! Let them use the app now.
		      alert("success!");
		    },
		    error: function(user, error) {
		      // Show the error message somewhere and let the user try again.
		      alert("Error: " + error.code + " " + error.message);
		    }
		  });
		}
	}
});
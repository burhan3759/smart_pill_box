angular.module('starter.login', [])

.controller('userCtrl',function($scope, $ionicLoading, $rootScope,$state){
	$scope.user = {};

    $scope.login = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Logging in',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

	
	  Parse.User.logIn($scope.user.username, $scope.user.password, {
	    success: function(user) {
	      // Do stuff after successful login.
	      console.log(user);
	   
		    $ionicLoading.hide();
	        $rootScope.user = user;
	        $rootScope.isLoggedIn = true;
	        $state.go('tab.chats', {
	            clear: true
	        });
	    },
	    error: function(user, error) {
	      $ionicLoading.hide();
	      // The login failed. Check error to see why.
	        if (err.code === 101) {
                $scope.error.message = 'Invalid login credentials';
            } else {
                $scope.error.message = 'An unexpected error has ' +
                    'occurred, please try again.';
            }
            $scope.$apply();
	    }
	  });
	};

	//login code end

	//signup code begin
	$scope.signupEmail = function(){

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
 
	};
});
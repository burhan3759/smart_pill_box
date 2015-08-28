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
			localStorage[':pid'] = JSON.stringify($scope.data.pillId);

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
	
  $scope.reminder = function(){


      var date = new Date();  
      console.log("date: : : "+date);
      date = (date.toString()).substring(0,3);
      date += "day";
      date = date.toString();
      console.log(date);

      // $scope.pid = JSON.parse(localStorage['pid']);
      var Time = Parse.Object.extend("Pillbox");
      var query = new Parse.Query(Time);
      // query.descending("createdAt");
      // query.equalTo("Pid", $scope.pid);
      // query.descending("createdAt");
      query.first({
        success: function(object) {
          // Successfully retrieved the object.
          console.log("Retrieved object from parse " + object);
          //Only retrieve from the foodAudit column
          $scope.day = object.get('Friday');
          console.log($scope.day[0].id);
        },
        error: function(error) {
          console.log("Error: " + error.code + " " + error.message);
        }
      });
  }

});
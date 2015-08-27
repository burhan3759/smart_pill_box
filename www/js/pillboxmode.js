angular.module('starter.pillBoxMode', [])

.controller('PillboxCtrl', function($scope) {

})

.controller('PairCtrl', function($scope) {
  var a = (Math.floor(1000 + Math.random() * 9000)).toString();
  $scope.code = a.substring(-2);
});
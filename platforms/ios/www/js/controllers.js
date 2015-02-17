angular.module('berdua.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('EventIndexCtrl', function($scope, EventService) {
  $scope.events = EventService.all();
})

// A simple controller that shows a tapped item's data
.controller('EventDetailCtrl', function($scope, $stateParams, EventService) {
  $scope.event = EventService.get($stateParams.petId);
})

.controller('ContentCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

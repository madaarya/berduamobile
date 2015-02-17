angular.module('berdua.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('EventIndexCtrl', function($scope, Event, $ionicModal, $ionicPlatform) {

  $scope.event = [];

  $ionicPlatform.ready(function () {
    Event.all().then(function(result){
      $scope.events = result;
    });
  });

  $ionicModal.fromTemplateUrl('templates/events/event_modal.html', function(modal) {
    $scope.eventModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.newEvent = function() {
    $scope.eventModal.show();
  };

  $scope.closeNewEvent = function() {
    $scope.eventModal.hide();
  };

  $scope.createNewUser = function () {
    console.log("create start");
    Event.create($scope.event);
    $location.path('/user-list');
  }

})

.controller('EventDetailCtrl', function($scope, $stateParams, Event, $ionicPlatform) {
  $ionicPlatform.ready(function () {
    Event.find($stateParams).then(function(result){
      $scope.event = result;
    })
  })
})


.controller('ContentCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

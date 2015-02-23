angular.module('berdua.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('EventIndexCtrl', function($scope, Event, $ionicModal, $ionicPlatform, $location, $ionicPopup) {

  $scope.getAll = function(){
    Event.all().then(function(result){
      $scope.events = result;
    });
  }

  $scope.event = [];

  $ionicPlatform.ready(function () {
    $scope.getAll();
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

  $scope.createEvent = function () {
    Event.create($scope.event);
    $scope.eventModal.hide();
    $scope.getAll();
  };

  $scope.destroy = function(item) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete event',
      template: 'Are you sure?'
    });
    confirmPopup.then(function(res) {
     if(res) {
        Event.destroy(item);
        $scope.getAll();
     } else {
        confirmPopup.close();
     }
    });
  };


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

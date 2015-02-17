// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

var db = null;

var populateDB = function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS events (title TEXT, note TEXT)');
};

var errorCB = function(err) {
  console.log("Error processing SQL: "+err.code);
};

var successCB = function() {
  console.log("success!");
};

angular.module('berdua', ['ionic', 'ngCordova','berdua.services', 'berdua.controllers'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {
  $ionicPlatform.ready(function() {
    
    db = window.openDatabase("my.db", '1', 'my database', 5 * 1024 * 1024);
    db.transaction(populateDB, errorCB, successCB);

    $rootScope.dbconnect = "sample global var";

    if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
        StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // the pet tab has its own child nav-view and history
    .state('tab.event-index', {
      url: '/events',
      views: {
        'layout-center': {
          templateUrl: 'templates/events/index.html',
          controller: 'EventIndexCtrl'
        }
      }
    })

    .state('tab.event-detail', {
      url: '/event/:eventId',
      views: {
        'layout-center': {
          templateUrl: 'templates/events/show.html',
          controller: 'EventDetailCtrl'
        }
      }
    })

    .state('tab.adopt', {
      url: '/adopt',
      views: {
        'layout-center': {
          templateUrl: 'templates/adopt.html'
        }
      }
    })

    .state('tab.about', {
      url: '/about',
      views: {
        'layout-center': {
          templateUrl: 'templates/about.html'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/events');

  //  if use pretty url
  // $locationProvider.html5Mode(true);
});

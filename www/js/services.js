// angular.module('berdua.services', [])

// /**
//  * A simple example service that returns some data.
//  */
// .factory('EventService', function() {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var events = [
//     { id: 0, title: 'Cats', description: 'Furry little creatures. Obsessed with plotting assassination, but never following through on it.' },
//     { id: 1, title: 'Dogs', description: 'Lovable. Loyal almost to a fault. Smarter than they let on.' },
//     { id: 2, title: 'Turtles', description: 'Everyone likes turtles.' },
//     { id: 3, title: 'Sharks', description: 'An advanced pet. Needs millions of gallons of salt water. Will happily eat you.' }
//   ];

//   return {
//     all: function() {
//       return events;
//     },
//     get: function(eventId) {
//       // Simple index lookup
//       return events[eventId];
//     }
//   }
// });

angular.module('berdua.services', []) 
.factory('DBA', function($cordovaSQLite, $rootScope, $q) {
  var self = this;
 
  // Handle query's and potential errors
  self.query = function(query, parameters) {
    parameters = parameters || [];
    var deferred = $q.defer();
    db.transaction(function(transaction) {
      transaction.executeSql(query, parameters, 
        function(tx, result) { 
          deferred.resolve(result);
        },
        function(error){     // On error                               
          query_result = error;
        });
    });
    return deferred.promise;
  }
 
  // Proces a result set
  self.getAll = function(result) {
    var output = [];
 
    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  }
 
  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  }
 
  return self;
})
 
.factory('Event', function($cordovaSQLite, DBA) {
  var self = this;
 
  self.all = function() {
    return DBA.query("SELECT title, rowid FROM events")
      .then(function(result){
        all_result = DBA.getAll(result)
        return DBA.getAll(result);
      });
  }
 
 
  self.find = function(obj) {
    var parameters = [obj.eventId];
    return DBA.query("SELECT title, note FROM events WHERE rowid = (?)", parameters)
      .then(function(result) {
        return DBA.getById(result);
      });
  }

  self.create = function(event) {
    var parameters = [event.title, event.note];
    return DBA.query("INSERT INTO events (title, note) VALUES (?,?)", parameters);
  }
 
  self.destroy = function(event) {
    var parameters = [event.rowid];
    return DBA.query("DELETE FROM events WHERE rowid = (?)", parameters);
  }
 
  self.update = function(origevent, editevent) {
    var parameters = [editevent.title, editevent.note, origevent.rowid];
    return DBA.query("UPDATE events SET title = (?), note = (?) WHERE rowid = (?)", parameters);
  }
 
  return self;
});


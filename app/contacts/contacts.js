'use strict';

angular.module('ContactsApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contact_list.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', 'contactsREST', function($scope, contactsREST) {
  console.log("controller function");
  $scope.dial = function($event, c) {
    var number = c.cell || c.phone;
    if (number !== undefined) {
      window.alert("Dialing: "+number);
    } else {
      window.alert("No phone number"); 
    }
    console.log($event);
  }
  contactsREST.getContacts().then(function success(response) {

    var data = response.data;
    data = data.filter(function (e, i) {
      if (e.name !== undefined)
        return true;
      console.log("Discarding: "+e+' n:'+i);
      return false;
    });
    data.sort(function(a, b) {
      if (b.name === undefined || a.name === undefined) { return false; }
      if (a.name.last === b.name.last) {
        return (a.name.first > b.name.first);
      }
      return (a.name.last > b.name.last);
    });
    console.log(data);
    $scope.contacts = data;

  }, function error(response) {
    console.log("Error fetching URL" + response.statusText + ':' + response.status);
  });
}]);

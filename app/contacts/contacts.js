'use strict';

angular.module('ContactsApp.contacts', ['ngRoute'])
.filter('capitalize', function() {
  return function(txt) {
    var out = "";
    if (txt !== undefined) {
      out = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
    return out;
  }
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contacts', {
    templateUrl: 'contacts/contact_list.html',
    controller: 'ContactsCtrl'
  });
  $routeProvider.when('/contacts/:id', {
    templateUrl: 'contacts/contact_item.html',
    controller: 'ContactCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope', 'contactsREST', function($scope, contactsREST) {
  console.log("ContactsCtrl");
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
}])

.controller('ContactCtrl', ['$scope', '$routeParams', 'contactsREST',
function($scope, $routeParams, contactsREST) {
  console.log("ContactCtrl");
  var uid = $routeParams.id;
  contactsREST.getContactDetail(uid).then(function success(response) {
    var profile = response.data;
    $scope.profile = profile;
    var p_contacts = [];
    var ctypes = ['email', 'cell', 'phone'];
    for (var i=0;i<ctypes.length;i++) {
      var contact_type = ctypes[i];
      var nc = {};
      if (profile[contact_type] !== undefined) {
        nc.type = contact_type;
        nc.value = profile[contact_type];
        nc.style = {'phone': 'phone-alt',
                    'cell': 'phone',
                    'email': 'envelope'}[nc.type];
      }
      p_contacts.push(nc);
    }
    $scope.contacts = p_contacts;
    console.log(p_contacts);
    console.log(profile);
  }, function error(response) {
    console.log("Error fetching URL" + response.statusText + ':' + response.status);
  });
}]);

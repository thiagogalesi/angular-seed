SERVICE_ADDRESS = 'http://192.168.1.100:8000';

angular.module('ContactsApp.services', [])
  .factory('contactsREST', function($http) {

    var contacts_api = {};

    contacts_api.getContacts = function() {
      console.log('contacts_api.getContacts');
      return $http.get(SERVICE_ADDRESS+'/users');
    }

    contacts_api.getContactDetail = function(id) {
      console.log('contacts_api.getContactDetail');
      return $http({
        method: 'JSONP',
        url: SERVICE_ADDRESS+'/users' + id
      });
    }

    contacts_api.createContact = function(data) {
      return $http.post(
        SERVICE_ADDRESS+'/users',
        data
      );
    }

    return contacts_api;
  });

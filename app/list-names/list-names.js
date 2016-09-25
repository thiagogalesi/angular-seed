'use strict';

angular.module('myApp.list-names', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list-names', {
    templateUrl: 'list-name/names.html',
    controller: 'NamesCtrl'
  });
}])

.controller('NamesCtrl', [function() {

}]);

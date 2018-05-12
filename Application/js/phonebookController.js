var myAppModule = angular.module('phonebookApp', []);

myAppModule.controller('phonebookController', function ($scope, $http, $location, $timeout, $interval) {

  function init() {
    console.log('hello world!');
  }

  $scope.data = [{
      name: "Tom",
      tel: "012-345-6789"
    },
    {
      name: "Jerry",
      tel: "012-345-6789"
    },
    {
      name: "Philip",
      tel: "012-345-6789"
    }
  ];
  init();
});
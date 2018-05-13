var myAppModule = angular.module('phonebookApp', []);

myAppModule.controller('phonebookController', function ($scope, $http, $location, $timeout, $interval) {

  function init() {
    console.log('hello world!');
    $scope.fetchData();
  }

  $scope.fetchData = function () {
    $http.get("/api/phonebooks")
      .success(function (response) {
        $scope.data = response;
      })
      .error(function (error) {
        console.log("error Fetching Data : " + error);
      });
    setTimeout($scope.fetchData, 200);
  }

  $scope.addContact = function(newName,newTel){
    $scope.data.push({name:newName,tel:newTel});
    $http.post("/api/phonebook",JSON.stringify({name:newName,tel:newTel}),{headers:{'content-type':'application/json'}})
      .success(function (response) {
        console.log('successfully added new Contact');
      })
      .error(function (error) {
        console.log("error adding new Contact : " + error);
      });
  }
  
  $scope.deleteContact = function(contactId){
    console.log('inside deleteContact');
    console.log('Contacts:', $scope.data);
    $http.delete("/api/phonebook/" + contactId)
      .success(function (response) {
        console.log('successfully removed Contact: ', contactId);
      })
      .error(function (error) {
        console.log("error adding new Contact : " + error);
      });
  }
  init();
});
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
    // setTimeout($scope.fetchData, 20000);
  }

  $scope.addContact = function (newName, newTel) {
    $scope.data.push({
      name: newName,
      tel: newTel
    });
    $http.post("/api/phonebook", JSON.stringify({
        name: newName,
        tel: newTel
      }), {
        headers: {
          'content-type': 'application/json'
        }
      })
      .success(function (response) {
        console.log('successfully added new Contact');
      })
      .error(function (error) {
        console.log("error adding new Contact : " + error);
      });
      $scope.fetchData()
  }

  $scope.deleteContact = function (contactId) {
    console.log('inside deleteContact');
    $http.delete("/api/phonebook/" + contactId)
      .success(function (response) {
        console.log('successfully removed Contact: ', contactId);
      })
      .error(function (error) {
        console.log("error adding new Contact : " + error);
      });
      $scope.fetchData()
  }

  $scope.editContact = function (contact) {
    console.log('inside deleteContact');
    // $http.post("/api/phonebook/" + contactId)
    //   .success(function (response) {
    //     console.log('successfully removed Contact: ', contactId);
    //   })
    //   .error(function (error) {
    //     console.log("error adding new Contact : " + error);
    //   });
    $scope.fetchData()
  }

  $scope.validateForm = function (name, tel) {
    if (name === undefined || tel === undefined) return false;
    if (name.length <= 0) return false;
    if (tel.length <= 0) return false;
    let numberValidator = /\+[0-9]{1,4}\ [0-9]{2}\ [0-9]{6,}/;
    if (!numberValidator.exec(tel)) return false;
    // if (numberValidator.exec(tel)[0].length) return false;
    return true;
  }

  $scope.enterEdition = function(contactId){
    for(contact of $scope.data){
      if(contact._id = contactId){
        contact.edit = true;
        console.log(contact);
      }
    }
  }
  $scope.testTrue = function(input){
    return true;
  }
  init();
});
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

describe('phonebookController', function() {
  beforeEach(module('phonebookApp'));

  var $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('$scope.testTrue', function() {
    it('tries to call testTrue function', function(){
      expect(true).toBe(true);
    })
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('PasswordController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.grade();
      expect($scope.strength).toEqual('strong');
    });
  });
});
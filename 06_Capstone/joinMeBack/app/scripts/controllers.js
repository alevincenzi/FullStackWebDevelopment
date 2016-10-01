'use strict';

angular.module('joinMeApp')

.controller('HeaderController',
    
['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory',
function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
  
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
      
    $scope.openLogin = function() {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController" });
    };

    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController" });
    };  
  
    $scope.logOut = function() {
        AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $state.go('app', {}, { reload: true });
    };

    $scope.collapseMenu = function() {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            setTimeout(function() {
            // console.log($state.current.name);
                if (!$state.is('app.profile')) {
                    jQuery("#navbar").collapse('hide');
                }
            }, 500);
        }
    };  
  
    $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
      
    $rootScope.$on('registration:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
  
    $scope.stateis = function(curstate) {
        var stateMatched = $state.is(curstate);
        if (!stateMatched) {
            $scope.collapseMenu();
        }
        return stateMatched;  
    };
}])

.controller('HomeController',

['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory',
function ($scope, menuFactory, corporateFactory, promotionFactory) {

}])

.controller('EventDetailController',

['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory',
function ($scope, $state, $stateParams, menuFactory, commentFactory) {

}])

.controller('MyEventsController',

['$scope', 'corporateFactory',
function ($scope, corporateFactory) {

}])

.controller('JoinedEventsController',

['$scope', '$state', 'favoriteFactory',
function ($scope, $state, favoriteFactory) {

}])

.controller('NewEventController',
    
['$scope', 'feedbackFactory',
function ($scope, feedbackFactory) {

}])

.controller('LoginController',

['$scope', 'ngDialog', '$localStorage', 'AuthFactory',
function ($scope, ngDialog, $localStorage, AuthFactory) {
 
    $scope.loginData = $localStorage.getObject('userinfo', '{}');

    $scope.doLogin = function() {
        if($scope.rememberMe)
            $localStorage.storeObject('userinfo',$scope.loginData);
        AuthFactory.login($scope.loginData);
        ngDialog.close();
    };
          
    $scope.openRegister = function () {
        ngDialog.open({
            template: 'views/register.html',
            scope: $scope,
            className: 'ngdialog-theme-default',
            controller: "RegisterController"
        });
    };
}])

.controller('RegisterController',

['$scope', 'ngDialog', '$localStorage', 'AuthFactory',
function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.register={};
    $scope.loginData={};

    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);
        AuthFactory.register($scope.registration);
        ngDialog.close();
    };    
}])
;
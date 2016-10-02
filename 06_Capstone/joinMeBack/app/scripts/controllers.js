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

    $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
      
    $rootScope.$on('registration:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
  
    $scope.stateis = function(curstate) {
        return $state.is(curstate);  
    };
}])

.controller('EventsController',

['$scope', '$rootScope', 'eventsFactory', 'AuthFactory',
function ($scope, $rootScope, eventsFactory, AuthFactory) {

    $scope.loggedIn = AuthFactory.isAuthenticated();

    if ($scope.loggedIn) {
        $scope.userid = AuthFactory.getUserId();
    }

    $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.userid   = AuthFactory.getUserId();
    });

    eventsFactory.query(
        function (response) {
            $scope.events = response;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

    $scope.ellipsify = function(str) {
        if (str.length > 120) {
            return (str.substring(0, 120) + "...");
        }
        else {
            return str;
        }
    };
}])

.controller('EventDetailController',

['$scope', '$state', '$stateParams', 'eventsFactory', 'commentsFactory',
function ($scope, $state, $stateParams, eventsFactory, commentsFactory) {

    $scope.eevent = {};

    $scope.message = "";
    $scope.eevent = eventsFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.eevent = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.mycomment = {
        comment: ""
    };

    $scope.submitComment = function () {

        commentsFactory.save({id: $stateParams.id}, $scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            comment: ""
        };
    };
}])

.controller('MyEventsController',

['$scope', 'eventsFactory',
function ($scope, eventsFactory) {

}])

.controller('JoinedEventsController',

['$scope', '$state', 'eventsFactory',
function ($scope, $state, eventsFactory) {

}])

.controller('NewEventController',
    
['$scope', '$state', 'eventsFactory',
function ($scope, $state, eventsFactory) {

    $scope.newEvent = {
        title: "",
        image : "../images/joinme-icon.png",
        description: "",
        place : "",
        dateAndTime: "",
        tags:""
    };

    $scope.selectedCost = 'Free';
    $scope.selectedParticipants = 'Open to everybody';
    $scope.costAmount=0;
    $scope.nbrParticipants=0;

    $scope.createNewEvent = function () {

        console.log('Adding new event ', $scope.newEvent);
        
        $scope.newEvent.participants = $scope.selectedParticipants;
        
        if ($scope.selectedParticipants !== 'Open to everybody'){
            $scope.newEvent.participants =
                $scope.newEvent.participants + " " + $scope.nbrParticipants + " participants";
        }

        if ($scope.selectedCost !== 'Free'){
            $scope.newEvent.cost= $scope.costAmount + "$ " + $scope.selectedCost;
        }else{
            $scope.newEvent.cost= $scope.selectedCost;
        }

        eventsFactory.save($scope.newEvent,
            function(response) {
                console.log(response);
                console.log(response._id);
                $state.go('app.eventdetail', { id: response._id });
            }
        );
        
        /*
        $scope.newEvent = {
            title: "",
            image : "../images/joinme-icon.png",
            description: "",
            place : "",
            dateAndTime: "",
            tags:""
        };
        
        $scope.newEventForm.$setPristine();
        */
    };
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
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

['$scope', '$rootScope', '$state', '$stateParams', 'eventsFactory', 'commentsFactory', 'joinsFactory', 'AuthFactory',
function ($scope, $rootScope, $state, $stateParams, eventsFactory, commentsFactory, joinsFactory, AuthFactory) {

    $scope.eevent = {};
    $scope.message = "";
    $scope.loggedIn = AuthFactory.isAuthenticated();
    
    var completed = false;
    var hasJoinedTheEvent = false;

    if ($scope.loggedIn) {
        $scope.userid = AuthFactory.getUserId();
    }

    $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.userid   = AuthFactory.getUserId();
    });

    var searchForJoinEvents = function() {
        joinsFactory.query(
            function (response) {
                hasJoinedTheEvent = false;
                for(var index = 0 ; index < response.events.length ; index++) {   
                    if ($scope.eevent._id === response.events[index]._id) {
                        hasJoinedTheEvent = true;
                        break;
                    }
                }
                completed = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    };

    $scope.eevent = eventsFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.eevent = response;
                searchForJoinEvents();
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.mycomment = {
        comment: ""
    };

    var userIsOwner = function(){
        return ($scope.eevent.createdBy._id === $scope.userid);
    };  
    
    $scope.canDelete = function(){
        return completed && userIsOwner();
    };    
    $scope.canJoin = function(){
        return completed && !userIsOwner() && !hasJoinedTheEvent;
    };    
    $scope.canLeave = function(){
        return completed && !userIsOwner() && hasJoinedTheEvent;
    };    

    $scope.joinEvent = function() {
        joinsFactory.save({_id: $scope.eevent._id});
        $state.go($state.current, {}, {reload: true});
    };
    
    $scope.deleteEvent = function() {
        eventsFactory.delete({id: $scope.eevent._id});
        $state.go('app.myevents');
    };
    
    $scope.leaveEvent = function() {
        joinsFactory.delete({id: $scope.eevent._id});
        $state.go($state.current, {}, {reload: true});
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

['$scope', '$rootScope', 'eventsFactory', 'AuthFactory',
function ($scope, $rootScope, eventsFactory, AuthFactory) {

    $scope.loggedIn = AuthFactory.isAuthenticated();
    var completed = false;

    if ($scope.loggedIn) {
        $scope.userid = AuthFactory.getUserId();
    }

    $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.userid   = AuthFactory.getUserId();
    });

    eventsFactory.query({ "createdBy" : $scope.userid }).$promise.then(
        function (response) {
            $scope.events = response;
            completed = true;
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
    
    $scope.hasEvents = function() {
        return completed && ($scope.events.length !== 0);
    };   
    
    $scope.noEvents = function() {
        return completed && ($scope.events.length === 0);
    };
}])

.controller('JoinedEventsController',

['$scope', '$rootScope', 'joinsFactory', 'AuthFactory',
function ($scope, $rootScope, joinsFactory, AuthFactory) {

    $scope.loggedIn = AuthFactory.isAuthenticated();
    var completed = false;
    
    if ($scope.loggedIn) {
        $scope.userid = AuthFactory.getUserId();
    }

    joinsFactory.query(
        function (response) {
            $scope.events = response.events;
            completed = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );

    $rootScope.$on('login:Successful', function() {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.userid   = AuthFactory.getUserId();
    });
    
    $scope.ellipsify = function(str) {
        if (str.length > 120) {
            return (str.substring(0, 120) + "...");
        }
        else {
            return str;
        }
    };
    
    $scope.hasEvents = function() {
        return completed && ($scope.events.length !== 0);
    };   
    
    $scope.noEvents = function() {
        return completed && ($scope.events.length === 0);
    };
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

    $scope.tTag = [];
    var parseTags = function (){
        for (var v in $scope.tags){
            $scope.tTag.push($scope.tags[v].text);
        }
    };

    $scope.createNewEvent = function () {

        parseTags();
        $scope.newEvent.tags= $scope.tTag;

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
                $state.go('app.eventdetail', { id: response._id });
            }
        );
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
        AuthFactory.register($scope.registration);
        ngDialog.close();
    };    
}])
;
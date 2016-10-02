'use strict';

angular.module('confusionApp')

.controller('HeaderController',
    
['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory',
function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('HomeController',

['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory',
function ($scope, $window) {

 $scope.events= [{
                                    _id : 1,
                                    owner: "Tom Cruz",
                                    image : "../images/joinme-icon.png",
                                    title: "Football",
                                    description: "This meetup is for the people who want to study or practice seriously Japanese or French. In both languages, every level, even beginners, are welcome. The purpose is to have equal numbers of Japanese native speakers and French speakers to form some duos. I hope it! /n This event is located in Rolex learning Center. It's a nice and quiet area.",
                                    place : "Lausanne",
                                    participants: "At least 11 participants",
                                    dateAndTime: "11.02.2016 At 12:00",
                                    cost: "Free",
                                    tags:"foot, group"
                                }
                                ,{
                                            _id : 2,
                                             owner: "J-Lo",
                                             image : "../images/joinme-icon.png",
                                            title: "Dance",
                                            description: "Cool dancing coaching time",
                                            place : "Zurich",
                                            participants: "At most 5 participants",
                                              dateAndTime: "11.02.2016 At 12:00",
                                            cost: "12 per person",
                                            tags:"Dance, fun, play"
                                        }
                        ,{
                                            _id : 3,
                                             owner: "Luciano Pavarotti",
                                             image : "../images/joinme-icon.png",
                                            title: "Dance",
                                            description: "Cool dancing coaching time",
                                            place : "Lausanne",
                                            participants: "At most 5 participants",
                                            dateAndTime: "11.02.2016 At 12:00",
                                            cost: "20 to devide between participants",
                                            tags:"Dance, fun, play"
                                        },
                        {
                                    _id : 4,
                                      owner: "Yann Bartes",
                                    image : "../images/joinme-icon.png",
                                    title: "Baseball",
                                    description: "Play together. This Youth Flag Football program is open to boys that will be entering 7th - 9th grade. ",
                                    place : "Morges",
                                    participants: "At least 11 participants",
                                      dateAndTime: "11.02.2016 At 12:00",
                                    cost: "Free",
                                    tags:"foot, group"
                                }
                                ,{
                                            _id : 5,
                                              owner: "J-Lo",
                                             image : "../images/joinme-icon.png",
                                            title: "Tennis",
                                            description: "Cool dancing coaching time",
                                            place : "Zurich",
                                            participants: "At most 5 participants",
                                              dateAndTime: "11.02.2016 At 12:00",
                                            cost: "Free",
                                            tags:"Dance, fun, play"
                                        }
                         ];

    $scope.ellipsify = function(str) {
    if (str.length > 120) {
        return (str.substring(0, 120) + "...");
    }
    else {
        return str;
    }
}

}])

.controller('EventDetailController',

['$scope', '$state', '$stateParams',
function ($scope, $state, $stateParams) {

    console.log("ID : " + $stateParams._id);
    $scope.event={
            _id : 1,
            owner: "Tom Cruz",
            image : "../images/joinme-icon.png",
            title: "Football",
            description: "This meetup is for the people who want to study or practice seriously Japanese or French. In both languages, every level, even beginners, are welcome. The purpose is to have equal numbers of Japanese native speakers and French speakers to form some duos. I hope it! /n This event is located in Rolex learning Center. It's a nice and quiet area.",
            place : "Lausanne",
            participants: "At least 11 participants",
            dateAndTime: "11.02.2016 At 12:00",
            cost: "20 to devide between participants",
            tags:"foot, group",
            comments: [
            {comment : "Amazing event, thank you! I am in", postedBy: "Michel Obama"},
            {comment : "Do we need to bring anything?", postedBy: "M. Jordan"},
            {comment : "No, we are fully prepared. Come and enjoy :)", postedBy: "Tom Cruz"},
            {comment : "I will be there like last time.", postedBy: "Lola Gomez"}
            ]
    };

// Add eventFactory
//    $scope.showEvent = false;
//    $scope.message = "Loading ...";
//    $scope.event = eventFactory.get({
//            id: $stateParams._id
//        })
//        .$promise.then(
//            function (response) {
//                $scope.event = response;
//                $scope.showEvent = true;
//            },
//            function (response) {
//                $scope.message = "Error: " + response.status + " " + response.statusText;
//            }
//        );

    $scope.mycomment = {
        comment: ""
    };

    $scope.submitComment = function () {
        commentFactory.save({id: $stateParams.id}, $scope.mycomment);
        $state.go($state.current, {}, {reload: true});
        $scope.commentForm.$setPristine();
        $scope.mycomment = {
            rating: 5,
            comment: ""
        };
    }
}])

.controller('MyEventsController',
['$scope',
function ($scope) {

 $scope.events= [{
                _id : 1,
                owner: "Tom Cruz",
                image : "../images/joinme-icon.png",
                title: "Football",
                description: "This meetup is for the people who want to study or practice seriously Japanese or French. In both languages, every level, even beginners, are welcome. The purpose is to have equal numbers of Japanese native speakers and French speakers to form some duos. I hope it! /n This event is located in Rolex learning Center. It's a nice and quiet area.",
                place : "Lausanne",
                participants: "At least 11 participants",
                dateAndTime: "11.02.2016 At 12:00",
                cost: "Free",
                tags:"foot, group"
            }
            ,{
                        _id : 2,
                         owner: "J-Lo",
                         image : "../images/joinme-icon.png",
                        title: "Dance",
                        description: "Cool dancing coaching time",
                        place : "Zurich",
                        participants: "At most 5 participants",
                          dateAndTime: "11.02.2016 At 12:00",
                        cost: "12 per person",
                        tags:"Dance, fun, play"
                    }
    ];

    $scope.showEvents = true;
    $scope.noEvents= function(){
        console.log($scope.events.length);
        return $scope.showEvents && ($scope.events.length ==0);
    }
     $scope.ellipsify = function(str) {
        if (str.length > 120) {
            return (str.substring(0, 120) + "...");
        }
        else {
            return str;
        }
     }

}])

.controller('JoinedEventsController',

['$scope', '$state', 'favoriteFactory',
function ($scope, $state, favoriteFactory) {

    $scope.events= [];
    $scope.showEvents = true;
    $scope.noEvents= function(){
        console.log($scope.events.length);
        return $scope.showEvents && ($scope.events.length ==0);
    }

//    $scope.tab = 1;
//    $scope.filtText = '';
//    $scope.showDetails = false;
//    $scope.showDelete = false;
//    $scope.showMenu = false;
//    $scope.message = "Loading ...";
//
//    favoriteFactory.query(
//        function (response) {
//            $scope.dishes = response.dishes;
//            $scope.showMenu = true;
//        },
//        function (response) {
//            $scope.message = "Error: " + response.status + " " + response.statusText;
//        });
//
//    $scope.select = function (setTab) {
//        $scope.tab = setTab;
//
//        if (setTab === 2) {
//            $scope.filtText = "appetizer";
//        } else if (setTab === 3) {
//            $scope.filtText = "mains";
//        } else if (setTab === 4) {
//            $scope.filtText = "dessert";
//        } else {
//            $scope.filtText = "";
//        }
//    };
//
//    $scope.isSelected = function (checkTab) {
//        return ($scope.tab === checkTab);
//    };
//
//    $scope.toggleDetails = function () {
//        $scope.showDetails = !$scope.showDetails;
//    };
//
//    $scope.toggleDelete = function () {
//        $scope.showDelete = !$scope.showDelete;
//    };
//
//    $scope.deleteFavorite = function(dishid) {
//        console.log('Delete favorites', dishid);
//        favoriteFactory.delete({id: dishid});
//        $scope.showDelete = !$scope.showDelete;
//        $state.go($state.current, {}, {reload: true});
//    };

    $scope.ellipsify = function(str) {
        if (str.length > 120) {
            return (str.substring(0, 120) + "...");
        }
        else {
            return str;
        }
    }
}])


.controller('NewEventController',
    
['$scope', 'feedbackFactory',
function ($scope, feedbackFactory) {

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
            $scope.newEvent.participants= $scope.selectedParticipants;
            if ($scope.selectedParticipants !== 'Open to everybody'){
                $scope.newEvent.participants= $scope.newEvent.participants + " " + $scope.nbrParticipants + " participants";
            }

            if ($scope.selectedCost !== 'Free'){
                $scope.newEvent.cost= $scope.costAmount + "$ " + $scope.selectedCost;
            }else{
                $scope.newEvent.cost= $scope.selectedCost;
            }

//            feedbackFactory.save($scope.newEvent);
//            $scope.newEvent = {
//                title: "",
//                description: "",
//                place : "",
//                dateAndTime: "",
//                tags:""
//            };
//            $scope.newEventForm.$setPristine();
        };
    }]
)

.controller('LoginController',

['$scope', 'ngDialog', '$localStorage', 'AuthFactory',
function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
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
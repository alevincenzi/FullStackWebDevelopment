'use strict';

angular.module('confusionApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            .state('app.eventdetail', {
                url: 'event/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/eventdetail.html',
                        controller  : 'EventDetailController'
                   }
                }
            })

            .state('app.myevents', {
                url:'myevents',
                views: {
                    'content@': {
                        templateUrl : 'views/myevents.html',
                        controller  : 'MyEventsController'                  
                    }
                }
            })

            .state('app.joinedevents', {
                url: 'joinedevents',
                views: {
                    'content@': {
                        templateUrl : 'views/joinedevents.html',
                        controller  : 'JoinedEventsController'
                   }
                }
            })
        
            .state('app.newevent', {
                url:'newevent',
                views: {
                    'content@': {
                        templateUrl : 'views/newevent.html',
                        controller  : 'NewEventController'                  
                    }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;

'use strict';

angular.module('joinMeApp', ['ui.router','ngResource','ngDialog', 'ngTagsInput'])
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
                        controller  : 'EventsController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            .state('app.eventdetail', {
                url: 'events/:id',
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

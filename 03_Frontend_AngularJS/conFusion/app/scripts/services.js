'use strict';

angular.module('confusionApp')

.constant("baseURL", "http://localhost:3000/")

.service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    this.getDishes = function(){
        return $resource(
            baseURL + "dishes/:id", null, {'update':{method:'PUT' }});
    };
                                    
    this.getPromotions = function() {
        return $resource(
            baseURL + "promotions/:id");
    };  
}])

.service('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
    this.getLeaders = function(){
        return $resource(
            baseURL + "leadership/:id");
    };
}])

.service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {

    this.getFeedbacks = function(){
        return $resource(
            baseURL + "feedback/:id", null, {'save' : { method : 'POST' }});
    };
}])
;
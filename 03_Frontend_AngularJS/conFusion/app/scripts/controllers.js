'use strict';

angular
.module('confusionApp')
.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.showMenu = false;
    $scope.message  = "Loading ...";

    $scope.dishes = menuFactory.getDishes().query(

        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message =
                "Error: " + response.status + " " + response.statusText;
        }
    );
    
    $scope.selectTab = function(setTab) {
        $scope.tab = setTab;  

        if (setTab === 2){
            $scope.filtText = "appetizer";
        } else if (setTab === 3){
            $scope.filtText = "mains";
        } else if (setTab === 4){
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";                
        }
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
    
    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };
}])
.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

    $scope.showDish = false;
    $scope.message  = "Loading ...";
    
    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
    
        function(response){
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message =
                "Error: " + response.status + " " + response.statusText;
        }
    );

    $scope.starLabelText = function (starCount) {
        if (starCount === 1){
            return "Star";
        } else {
            return "Stars";
        }
    };
}])
.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {
        mychannel:"",
        firstName:"",
        lastName:"",
        agree:false,
        email:""
    };
    
    var channels = [
        {value:"tel", label:"Tel."},
        {value:"Email",label:"Email"}];
        
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}])
.controller('FeedbackController', ['$scope', function($scope) {

    $scope.sendFeedback = function() {
        
        console.log($scope.feedback);
        
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            $scope.feedback.mychannel="";

            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}])
.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
	
	$scope.newcomment = { author:"", rating:5, comment:"", date:"" };	
	
	$scope.SubmitComment = function () {
		
		$scope.newcomment.date = new Date().toISOString();
		
		$scope.dish.comments.push($scope.newcomment);
		
        menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
        
		$scope.CommentForm.$setPristine();
		
		$scope.newcomment = { author:"", rating:5, comment:"", date:"" };
	};
}])
.controller('IndexController',['$scope', 'corporateFactory', 'menuFactory', function($scope, corporateFactory, menuFactory){

    $scope.showDish = false;
    $scope.message  = "Loading ...";
    
    $scope.dish = menuFactory.getDishes().get({id:0}).$promise.then(

        function(response){
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

    $scope.leader = corporateFactory.getLeader(3);

    $scope.promotion = menuFactory.getPromotion(0);
}])
.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    
    $scope.leaders = corporateFactory.getLeaders();
}])
;

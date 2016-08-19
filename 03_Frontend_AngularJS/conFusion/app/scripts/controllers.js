'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.showMenu = false;
    $scope.message  = "Loading menu ...";

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
    $scope.message  = "Loading dish ...";
    
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
        mychannel:"", firstName:"", lastName:"", agree:false, email:""
    };
    
    var channels = [
        {value:"tel",   label:"Tel."},
        {value:"Email", label:"Email"}];
        
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}])

.controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

    $scope.sendFeedback = function() {
        
        console.log($scope.feedback);
        
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;
            
            feedbackFactory.getFeedbacks().save(
				$scope.feedback,
				function(){
                    $scope.feedback = {
                        mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
				}
            );

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

    $scope.dishMessage  = "Loading ...";
    $scope.dishShow= false;
    $scope.dish = {};
    
    $scope.dish = menuFactory.getDishes().get({id:0}).$promise.then(

        function(response){
            $scope.dish = response;
            $scope.dishShow = true;
        },
        function(response) {
            $scope.dishMessage = "Error: "+response.status + " " + response.statusText;
        }
    );

	$scope.promotionMessage = "Loading promotion ...";
	$scope.promotionShow = false;
	$scope.promotion = {};

	$scope.promotion = menuFactory.getPromotions().get({id:0}).$promise.then(
        function(response){
            $scope.promotionShow = true;
            $scope.promotion = response;
        },
        function(response) {
            $scope.promotionMessage =
                "Error: "+response.status + " " + response.statusText;
        }
	);

	$scope.leaderMessage = "Loading leader ...";
	$scope.leaderShow = false;
	$scope.leader = {};

	$scope.leader = corporateFactory.getLeaders().get({id:3}).$promise.then(
        function(response){
            $scope.leaderShow = true;
            $scope.leader = response;
        },
        function(response) {
            $scope.leaderMessage =
                "Error: "+response.status + " " + response.statusText;
        }
	);
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    
	$scope.leadersMessage = "Loading leaders ...";
	$scope.leadersShow = false;
	$scope.leaders = {};
		
	corporateFactory.getLeaders().query(
        function(response) {
            $scope.leaders = response;
            $scope.leadersShow = true;
        },
        function(response) {
            $scope.leadersMessage = "Error: "+response.status + " " + response.statusText;
        }
	);
}])
;

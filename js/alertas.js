(function(){
	angular.module('alertas',[]);
	
	angular.module('alertas').factory('Alerts', function($timeout){
		var model = {
			message: '',
			seconds: 3,
			title: '',
			description: '',
			avisible: false,
			visible: false
		};
		
		angular.extend(model, {
	        loadAlert: function(object){
				var ms = object.seconds || model.seconds;
	        	var time = (ms*1000);

	        	model.avisible = true;
	        	model.message = object.message;

				$timeout(function() {
			        model.avisible = false;
			    }, time);
	        },
	        loadPopup: function(object){
	        	model.visible = true;
	        	model.title = object.title;
	        	model.description = object.description;
	        },
	        closePopup: function(){
	        	model.visible = false;
	        }
	    });
		
		return model;
	});

	angular.module('alertas').directive('alerts', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/popup.html',
            scope:{},
            controller: function($scope, Alerts){
            	$scope.model = Alerts;
            }
        }
    });
})();
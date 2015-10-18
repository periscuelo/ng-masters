/*
	Developed By Ibrahim Brumate
	Version: 0.0.1
	E-mail: periscuelo@gmail.com
*/
(function(){
	angular.module('anguLife',[]);
	
	angular.module('anguLife').config(function($compileProvider){
		$compileProvider.debugInfoEnabled(false);
	});

	angular.module('anguLife').factory('cells', function($interval){
		var model = {
			height: 10,
			width: 10,
			seconds: 0.1,
			day: 0,
			arrs: [],
			promise: {},
			auto: false
		};
		
		angular.extend(model, {
	        automatic: function(){
				model.auto = !model.auto;
				if (model.auto) {
					var ms = model.seconds * 1000;
					model.promise = $interval(function(){ model.step() }, ms, false);
				} else {
					$interval.cancel(model.promise);
				}
			},
			life: function(line, column){
	        	model.arrs[line][column] = !model.arrs[line][column];
	        },
	        reset: function(){
	        	angular.copy(firstState, model);
	        	model.updateGrid();
	        },
	        step: function(){
	        	model.day += 1;
	        	var newArr = [];
				angular.forEach(model.arrs, function(columns, line){
	            	newArr[line] = [];
	            	angular.forEach(columns, function(live, column){
            			var neighboor = 0; //Contagem dos vivos
        				var nt = line - 1; //Linha acima
            			var nb = line + 1; //Linha abaixo
            			var nl = column - 1; //Coluna Esquerda
            			var nr = column + 1; //Coluna Direita

            			//Verifica quantidade de vizinhos vivos
            			if (model.arrs[nt]!=undefined) {
            				if (model.arrs[nt][column]==true) neighboor++;	
            				if (model.arrs[nt][nl]!=undefined && model.arrs[nt][nl]==true) neighboor++;
            				if (model.arrs[nt][nr]!=undefined && model.arrs[nt][nr]==true) neighboor++;
            			}
            			if (model.arrs[nb]!=undefined) {
            				if (model.arrs[nb][column]==true) neighboor++;
            				if (model.arrs[nb][nl]!=undefined && model.arrs[nb][nl]==true) neighboor++;
            				if (model.arrs[nb][nr]!=undefined && model.arrs[nb][nr]==true) neighboor++;	
            			}
            			if (model.arrs[line][nl]!=undefined && model.arrs[line][nl]==true) neighboor++;
            			if (model.arrs[line][nr]!=undefined && model.arrs[line][nr]==true) neighboor++;

            			//Regras
            			newArr[line][column] = live;
            			if (!live && neighboor==3) newArr[line][column] = !live;
            			if (live && (neighboor <2 || neighboor>3)) newArr[line][column] = !live;
	            	});
	            });
				model.arrs = newArr;
	        },
	        updateGrid: function(){ 
	        	for (i=0; i<model.height; i++){
	            	model.arrs[i] = [];
	            	for (j=0; j<model.width; j++){
	            		model.arrs[i][j] = false;
	            	}
	            }
	            return model;
	        }
	    });
		
		var firstState = angular.copy(model);

		return model.updateGrid();
	});

	angular.module('anguLife').controller('grid', function($scope, cells){
		$scope.model = cells;
	});
})();

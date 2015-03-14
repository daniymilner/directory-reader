"use strict";

angular
	.module('reader')
	.factory('appUtilsFactory', [
		'$http',
		'$q',
		function($http, $q){
			this.request = function(params){
				var deferred = $q.defer();
				$http[params.method](params.url, params.data)
					.success(function(data){
						deferred.resolve(data);
					})
					.error(function(data){
						deferred.reject(data);
					});
				return deferred.promise;
			};

			return this;
		}
	]);
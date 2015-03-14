"use strict";

angular
	.module('reader', [
		'ui.router'
	])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			$stateProvider
				.state('home', {
					url: '/',
					views: {
						content: {templateUrl: 'views/reader'}
					}
				});
		}])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		function($rootScope, $state, $stateParams){
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
		}
	]);
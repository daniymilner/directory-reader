"use strict";

angular
	.module('reader')
	.controller('readerCtrl', [
		'appUtilsFactory',
		function(appUtils){
			var that = this,
				sizes = {
					gb: 'gb',
					mb: 'mb',
					kb: 'kb'
				};

			this.read = function(){
				appUtils
					.request({
						method: 'post',
						url: '/get-unique-files',
						data: {
							path: that.path
						}
					})
					.then(function(res){
						that.files = res;
						console.log(res);
					});
			};

			this.getSize = function(number){
				var gbDivided = getDivided(number, sizes.gb),
					mbDivided = getDivided(number, sizes.mb),
					kbDivided = getDivided(number, sizes.kb),
					gbSize = Math.round(gbDivided),
					mbSize = Math.round(mbDivided),
					kbSize = Math.round(kbDivided);
				return gbSize ? Math.round(gbDivided * 100) / 100 + ' Gb' :
					mbSize ? Math.round(mbDivided * 100) / 100 + ' Mb' :
						kbSize ? Math.round(kbDivided * 100) / 100 + ' Kb' : number + ' b';
			};

			function getDivided(number, type){
				switch(type){
					case sizes.gb:
						return number / 1024 / 1024 / 1024;
					case sizes.mb:
						return number / 1024 / 1024;
					case sizes.kb:
						return number / 1024;
				}
				return '';
			}
		}
	]);
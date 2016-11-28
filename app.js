(function() {
	var app = angular.module('indexapp', [ 'ngRoute', "ngCookies" ]);

	app.config([ '$logProvider', '$routeProvider',
			function($logProvider, $routeProvider) {
				$logProvider.debugEnabled(true);

				$routeProvider.when('/midify-user', {
//					controller : 'aController',
					controllerAs : 'home',
					templateUrl : '/angularjs-demo/app/midify-user.html'
				}).when('/', {
//					controller : 'bController',
					controllerAs : 'schools',
					templateUrl : '/angularjs-demo/app/electrical-goods.html'
				}).when('/men', {
//					controller : 'cController',
					controllerAs : 'classrooms',
					templateUrl : '/angularjs-demo/app/men.html'
				}).when('/women', {
//					controller : 'dController',
					controllerAs : 'activities',
					templateUrl : '/angularjs-demo/app/women.html'
				}).when('/shopCart', {
//					controller : 'dController',
					controllerAs : 'activities',
					templateUrl : '/angularjs-demo/app/shopcart.html'
				});
			} ]);
	app.controller('aController', function($scope, $http, $cookies) {
		$scope.getUserById = function() {

			$http({
				url : '/angularjs-demo/findUser.action',
				method : 'POST',
				data : {
					id : $cookies.userId
				}
			}).success(function(data) {
				$scope.user = data

			}).error(function() {
				console.log("error");
			})

		}

		$scope.update = function() {

			$http({
				url : '/angularjs-demo/updateUser.action',
				method : 'POST',
				data : {
					username : $scope.user.username,
					password : $scope.user.password,
					id : $cookies.userId
				}
			}).success(function(data) {
				if (data > 0) {
					alert("修改用户信息成功！")
				} else {
					alert("修改用户信息失败，请重试！")
				}

			})

		}

	});

	app.controller('bController', [ "$scope", "$http", "$cookies",
			function($scope, $http, $cookies) {
				var userId = $cookies.userId;
				$scope.fenye = 0;
				$scope.loadelectGood = function(){
					if (userId !== undefined) {
						$http({
							method : 'POST',
							url : '/angularjs-demo/loadelectgoods.action',
							responseType : "json",
							params : {
								"page" : $scope.fenye,
								
							}
							
						})
						// 成功回调函数
						.success(function(result) {

							$scope.cart = result;

						}).error(function(result) {

						})
					} else {
						window.location.href = "login.html";
					}
				}

				$scope.addGwc = function(item) {
					var shopType = 0;
					$http({
						method : 'POST',
						url : '/angularjs-demo/addShopCart.action',
						responseType : "json",
						params : {
							"userId" : userId,
							"shopId" : item.id,
							"shopName" : item.shop_name,
							"shopPrice" : item.shop_price,
							"shopType" : shopType,
						}
					})
					// 成功回调函数
					.success(function(result) {
						alert("添加成功");

					}).error(function(result) {

					})

				}
				$scope.PreSelect = function(){
					if($scope.fenye===0){
						alert("此页是最前页");
					}else{
						--$scope.fenye;
						$scope.loadelectGood();
					}
				}
				$scope.NextSelect = function(){
					++$scope.fenye;
					$scope.loadelectGood();
				}

			} ]);
	app.controller('cController', function($scope, $http,$cookies) {
		var userId = $cookies.userId;
		 $scope.shopList=function(){
        	 $http({
    	            url:'/angularjs-demo/findMenList.action',
    	            method: 'POST',            
    	            data: { shop_name:$scope.shopName,shop_price:$scope.shopPrice}      
    	        }).success(function(data){
    	        	$scope.men=data
    	        	
    	        }).error(function(){
    	            console.log("error");
    	        })
    		
        	
        	
        }
		 
		 $scope.addGwc = function(item) {
				var shopType = 0;
				$http({
					method : 'POST',
					url : '/angularjs-demo/addShopCart.action',
					responseType : "json",
					params : {
						"userId" : userId,
						"shopId" : item.id,
						"shopName" : item.shop_name,
						"shopPrice" : item.shop_price,
						"shopType" : shopType,
					}
				})
				// 成功回调函数
				.success(function(result) {
					alert("添加成功");

				}).error(function(result) {

				})

			}
		 
	});
	app.controller('dController', function($scope, $http) {

	});
	app.controller('eController', [ "$scope", "$http", "$cookies",
			function($scope, $http, $cookies) {

				var userId = $cookies.userId;
				if (userId !== undefined) {
					$http({
						method : 'POST',
						url : '/angularjs-demo/loadcartshop.action',
						responseType : "json",
						params : {
							"userId" : userId
						}
					})
					// 成功回调函数
					.success(function(result) {

						$scope.cart = result;

					}).error(function(result) {

					})
				} else {
					window.location.href = "login.html";
				}
				$scope.add = function(item) {
					var shopType = 0;
					$http({
						method : 'POST',
						url : '/angularjs-demo/addShopCart.action',
						responseType : "json",
						params : {
							"userId" : userId,
							"shopId" : item.shop_id,
							"shopName" : item.cart_name,
							"shopPrice" : item.cart_price,
							"shopType" : shopType,
						}
					})
					// 成功回调函数
					.success(function(result) {
						$scope.cart = result;

					}).error(function(result) {

					})
				}
				$scope.reduce = function(item) {

					if (item.cart_count < 2) {
						var keyConfirm=confirm("确定要删除此商品吗");
						if(keyConfirm){
							$scope.deleteGwc(item);
						}

					} else {
						var shopType = 1;
						$http({
							method : 'POST',
							url : '/angularjs-demo/addShopCart.action',
							responseType : "json",
							params : {
								"userId" : userId,
								"shopId" : item.shop_id,
								"shopName" : item.cart_name,
								"shopPrice" : item.cart_price,
								"shopType" : shopType,
							}
						})
						// 成功回调函数
						.success(function(result) {
							$scope.cart = result;
						}).error(function(result) {

						})

					}

				}
				$scope.clean = function(){
					var userId = $cookies.userId;
					if (userId !== undefined) {
						$http({
							method : 'POST',
							url : '/angularjs-demo/cleanShopCart.action',
							responseType : "json",
							params : {
								"userId" : userId,
							}
						})
						// 成功回调函数
						.success(function(result) {

							$scope.cart = result;

						}).error(function(result) {

						})
					} else {
						window.location.href = "login.html";
					}
				}
				$scope.deleteGwc = function(item) {
					var userId = $cookies.userId;
					if (userId !== undefined) {
						$http({
							method : 'POST',
							url : '/angularjs-demo/deleteShopCart.action',
							responseType : "json",
							params : {
								"userId" : userId,
								"id"     : item.id,
							}
						})
						// 成功回调函数
						.success(function(result) {

							$scope.cart = result;

						}).error(function(result) {

						})
					} else {
						window.location.href = "login.html";
					}

				}
				$scope.totalPrice = function() {
					var total = 0;
					angular.forEach($scope.cart, function(item) {
						total += item.cart_price * item.cart_count;
					})
					return total;
				}
				$scope.totalNum = function() {
					var total = 0;
					angular.forEach($scope.cart, function(item) {
						total += item.cart_count;
					})
					return total;
				}

			} ]);

}());
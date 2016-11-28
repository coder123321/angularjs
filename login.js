var app = angular.module('myApp', ["ngCookies"]);
app.controller('formCtrl', function($scope,$http,$cookies) {
    $scope.login = function() {
        $http({
            url:'/angularjs-demo/showLogin.action',
            method: 'POST',            
            data: {username:$scope.user.username,password:$scope.user.password}      
        }).success(function(data){
        	if((data.username!=null)&&(data.password!=null)){
        		var userId=data.id;
        		$cookies.userId= userId;
        		 window.location.href="index.html";
        	}else{
        		
        		alert("你输入用户名和密码错误，请重新输入！")
        	}
            
           
        }).error(function(){
            console.log("error");
        })
    };
});


app.controller('cartController', function($scope,$http) {
	
	
	console.log($scope.cart );
	
/*	$scope.cart=[
	             {
	            	id:1000,
	            	name:'iphone7',
	            	quantity:5,
	            	price:7000
	             },
	             {
		            	id:500,
		            	name:'imac',
		            	quantity:4,
		            	price:9000
		             },
	             {
		            	id:450,
		            	name:'ipad',
		            	quantity:14,
		            	price:8900
		             },
	             {
		            	id:120,
		            	name:'iphon6s',
		            	quantity:7,
		            	price:5000
		             }
		             
	             
	             
	             
	             ];*/
	/****
	 * 计算总价
	 */

	
	$scope.totalPrice = function() {
		var total = 0;
		angular.forEach($scope.cart, function(item) {
			total += item.price * item.quantity;
		})
		return total;
	}

	
	/****
	 * 计算总数
	 */

	
	$scope.totalQuantity = function() {
		var total = 0;
		angular.forEach($scope.cart, function(item) {
			total += parseInt(item.quantity);
		})
		return total;
	}
	
	/***
	 *  为产品添加一个数量
	 */
	
	$scope.add=function(id){
		var index=findIndex(id);
		if(index!=-1){
		++$scope.cart[index].quantity;
		}
	}
	/***
	 * 找一个元素的索引
	 */
	
	var findIndex=function(id){
		
		var index=-1;
		angular.forEach($scope.cart,function(item,key){
			
			if(item.id==id)
			index=key;
			return;
		});
		return index;
	}
	
	
	/****
	 * 减一个产品数量
	 */
	
	$scope.reduce=function(id){
		var index=findIndex(id);
		if(index!=-1){
		var item=$scope.cart[index];
		if(item.quantity>1){
			--item.quantity;
		}else{
			var returnkey=confirm("是否从购物车删除该产品 ！");
			if(returnkey){
				$scope.remove(id);
			}
		}
		}
	}
	
	$scope.remove=function(id){
	
		var index=findIndex(id);
	
		
		
		if(index!=-1){
			$scope.cart.splice(index,1);
			
		}
		          
		
		
		
	}
	
	$scope.$watch('data',function(newValue,oldValue){
		
		angular.forEach(newValue,function(item,key){
			if(item.quantity<1){
				
				var returnkey=confirm("是否从购物车中删除该产品!");
				
				if(returnkey){
					$scope.remove(item.id);
				}else{
					
					item.quantity=oldValue[key].quantity;
				}
				
				
			}
			
			
			
			
		})
			
		
		
		
		
	},true);
	
	
	
	
	
	
})
angular.module('starter.controllers', [])

// services
.factory('DealsService', function() {
	return {
		deals: [
			{ 
				title: 'Taco Tuesday', 
				business: 'Lime XS',
				description: '$1 taco Tuesday at Lime. There are also discounts on margaritas, $5 for a frozen.',
				id: 1 
			},
			{ 
				title: 'Two for one beer', 
				id: 2 
			},
			{ title: 'Free show', id: 3 },
			{ title: '$2 off coffee', id: 4 },
			{ title: 'Free slice', id: 5 },
			{ title: 'Bottomless mimosas', id: 6 }
  	]
	}
}) // end deals service

.factory('UserService', function() {

	return {
		user: {
			session: "hellosession",
			handle: "wreet",
			tags: [
				{
					tag: "beer"	
				}, {
					tag: "tacos"
				}, {
					tag: "drinks"
				}, {
					tag: "test"	
				}, {
					tag: "lol"
				}, {
					tag: "breakfast"
				}
			]
		}
	}
		
}) // end user service

// controllers
.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserService) {
  // Form data for the login modal
  $scope.loginData = {};
	$scope.user = UserService.user;
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('DealsCtrl', function($scope, $ionicModal, DealsService) {
	$scope.deals = DealsService.deals;
	
}) // end deals controller

.controller('DealCtrl', function($scope, $stateParams, DealsService) {
	$scope.deal = {};
	$scope.setDeal = function() {
		for (var i = 0; i < DealsService.deals.length; i++) {
			var d = DealsService.deals[i];
			if (d.id == $stateParams.deal_id)
				$scope.deal = d;
		}
		// when we are done do the map
		$scope.getMapView();
	} // end setDeal method
	
	$scope.getMapView = function() {
		var center = new google.maps.LatLng(39.7392, -104.9903);
		var map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			zoom: 15
		});
		var request = {
			location: center,
			radius: '500',
			query: $scope.deal.business
		};
		service = new google.maps.places.PlacesService(map);
		service.textSearch(request, function(results, stats){
			// callback
			for (var i = 0, result; result = results[i]; i++) {
				var marker = new google.maps.Marker({
					map: map,
					position: result.geometry.location
				});
			}
		}); // end callback
	} // end getMapView method
	
}) // end deal controller

.controller("TagsCtrl", function($scope, UserService) {
	$scope.user = {};
	$scope.setup = function() {
		$scope.user = UserService.user;	
	} // end setup method
}) // enf tags controller

; // end app









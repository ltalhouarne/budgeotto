angular.module('starter.controllers', ['firebase', 'chart.js'])

  .controller('WantsCtrl', function ($scope, $firebaseObject, $ionicLoading, $timeout, $ionicTabsDelegate, $ionicPopup) {
    $ionicLoading.show({
      template: 'Loading...'
    });

    var tmoBudget = 0;
    var tmoBudget2 = 0;
    $scope.budget = 0;
    $scope.budget2 = 0;

    $scope.swipeLeft = function () {
        $ionicTabsDelegate.select(1);
    };

    var ref = firebase.database().ref();
    $scope.data = $firebaseObject(ref);

    $scope.data.$loaded().then(function () {
      $ionicLoading.hide();
      angular.forEach($scope.data.wants, function (value, key) {
        tmoBudget += value.used;
        tmoBudget2 += value.max;
      });
      $scope.budget = tmoBudget;
      $scope.budget2 = tmoBudget2;
    });

    $scope.resetWants = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          $ionicLoading.show({
            template: 'Resetting data...'
          });

          angular.forEach($scope.data.wants, function (value, key) {
            if(value.used !== 0) value.used = 0;
          });

          $scope.data.$save().then(function (ref) {
            $ionicLoading.hide();
          }, function (error) {
            $ionicLoading.hide();
          });
        }
      });

      $ionicLoading.hide();
    };
    $scope.data.$watch(function () {
      var tmoBudget = 0;
      var tmoBudget2 = 0;
      angular.forEach($scope.data.wants, function (value, key) {
        tmoBudget += value.used;
        tmoBudget2 += value.max;
      });
      $scope.budget = tmoBudget;
      $scope.budget2 = tmoBudget2;
    });

    $scope.update = function (use, val, key, notes) {
      $ionicLoading.show({
        template: 'Loading...'
      });

      if (!isNaN(val)) {
        var date = new Date();

        if (notes === undefined || notes === "" || notes === null) {
          $ionicLoading.show({
            template: 'Notes? 😱'
          });
          $timeout(function () {
            $ionicLoading.hide();
            return;
          }, 2000);
        } else {
          $scope.data.logs.wantsSection[key][date] = {value: val, notes: notes};

          $scope.data.wants[key].used = +use + +val;

          $scope.data.$save().then(function (ref) {
            $ionicLoading.hide();
          }, function (error) {
            $ionicLoading.hide();
          });
        }
      }
    };
  })

  .controller('GraphsCtrl', function ($scope, $firebaseObject, $ionicLoading, $ionicTabsDelegate) {

    $scope.swipeLeft = function () {
      $ionicTabsDelegate.select(3);
    };

    $scope.swipeRight = function () {
      $ionicTabsDelegate.select(1);
    };

    $ionicLoading.show({
      template: 'Loading...'
    });

    var ref = firebase.database().ref();
    $scope.data2 = $firebaseObject(ref);

    $scope.data2.$watch(function () {
      $ionicLoading.hide();

      $scope.labels = [];
      $scope.series = ['Used', 'Max'];
      $scope.data = [];

      $scope.labelsN = [];
      $scope.seriesN = ['Used', 'Max'];
      $scope.dataN = [];
      $scope.dataD = [];
      $scope.dataDN = [];

      var tmp1 = [];
      var tmp2 = [];
      angular.forEach($scope.data2.wants, function (value, key) {
        if (key !== "💸 Savings") {
          $scope.labels.push(key);
          tmp1.push(value.used);
          tmp2.push(value.max);
        }
      });
      $scope.data[0] = tmp1;
      $scope.data[1] = tmp2;

      var tmp11 = [];
      var tmp22 = [];
      angular.forEach($scope.data2.needs, function (value, key) {
        if (key !== "🔑 Rent") {
          $scope.labelsN.push(key);
          tmp11.push(value.used);
          tmp22.push(value.max);
        }
      });
      $scope.dataN[0] = tmp11;
      $scope.dataN[1] = tmp22;
      $scope.dataD = tmp2;
      $scope.dataDN = tmp22;
    })
  })

  .controller('LogsCtrl', function ($scope, $firebaseObject, $ionicLoading, $ionicTabsDelegate) {
    $scope.swipeRight = function () {
      $ionicTabsDelegate.select(2);
    };

    $scope.chosenCategory = "Category";
    $scope.chosenCategory2 = "Category";

    var ref = firebase.database().ref();
    $scope.data = $firebaseObject(ref);
    $scope.data.$watch(function() {
        $scope.needs = $scope.data.logs.needsSection;
        $scope.wants = $scope.data.logs.wantsSection;
    });
  })

  .controller('NeedsCtrl', function ($scope, $firebaseObject, $ionicLoading, $firebaseArray, $timeout, $ionicTabsDelegate, $ionicPopup) {
    $scope.resetNeeds = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          $ionicLoading.show({
            template: 'Resetting data...'
          });

          angular.forEach($scope.data.needs, function (value, key) {
            if(value.used !== 0) value.used = 0;
          });

          $scope.data.$save().then(function (ref) {
            $ionicLoading.hide();
          }, function (error) {
            $ionicLoading.hide();
          });
        }
      });

      $ionicLoading.hide();
    };

    $ionicLoading.show({
      template: 'Loading...'
    });

    $scope.swipeLeft = function () {
      $ionicTabsDelegate.select(2);
    };

    $scope.swipeRight = function () {
      $ionicTabsDelegate.select(0);
    };

    var tmoBudget = 0;
    var tmoBudget2 = 0;
    $scope.budget = 0;
    $scope.budget2 = 0;

    var ref = firebase.database().ref();

    $scope.data = $firebaseObject(ref);

    $scope.data.$loaded().then(function () {
      $ionicLoading.hide();
      angular.forEach($scope.data.needs, function (value, key) {
        tmoBudget += value.used;
        tmoBudget2 += value.max;
      });

      $scope.budget = tmoBudget;
      $scope.budget2 = tmoBudget2;
    });

    $scope.data.$watch(function () {
      var tmoBudget = 0;
      var tmoBudget2 = 0;
      angular.forEach($scope.data.needs, function (value, key) {
        tmoBudget += value.used;
        tmoBudget2 += value.max;
      });
      $scope.budget = tmoBudget;
      $scope.budget2 = tmoBudget2;
    });

    $scope.update = function (use, val, key, notes) {
      $ionicLoading.show({
        template: 'Loading...'
      });

      if (!isNaN(val)) {
        var date = new Date();
        if (notes === undefined || notes === "" || notes === null) {
          $ionicLoading.show({
            template: 'Notes? 😱'
          });
          $timeout(function () {
            $ionicLoading.hide();
            return;
          }, 2000);
        } else {
          $scope.data.logs.needsSection[key][date] = {value: val, notes: notes};

          $scope.data.needs[key].used = +use + +val;

          $scope.data.$save().then(function (ref) {
            $ionicLoading.hide();
          }, function (error) {
            $ionicLoading.hide();
          });
        }
      }
    };
  })

  .filter('customOrderBy', function () {
    return function (arr) {
        arr.sort(function(a,b) {
          if(a.$key == "Setup") return 1;
          if(b.$key == "Setup") return -1;
          else return new Date(b.$key).getTime() - new Date(a.$key).getTime();
        });
        return arr;
    };
  });

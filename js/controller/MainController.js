(function () {
    var app = angular.module("githubViewer");
    var MainController = function ($scope, $interval, $location) {
        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };
        $scope.countDownInterval = null;
        var startCountdown = function () {
            $scope.countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };
        $scope.search = function (username) {
            if ($scope.countDownInterval) {
                $interval.cancel($scope.countDownInterval);
                $scope.countdown = null;
            }
            $location.path("/user/" + $scope.username);
        };

        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();
    };
    app.controller("MainController", MainController);
}());

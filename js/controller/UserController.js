//
(function () {
    var app = angular.module("githubViewer");
    var UserController = function ($scope, github, $routeParams) {
        var onComplete = function (data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        };
        var onRepos = function (data) {
            $scope.repos = data;
        };
        var onError = function (reason) {
            $scope.error = "unable to connect";
            //  $scope.user = null;
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        github.getUser($scope.username).then(onComplete, onError);
    };

    app.controller("UserController", UserController);

}());

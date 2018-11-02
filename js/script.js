//document.write('hello World.. how are you');
//
//var work = function(){
//    console.log("working very hard")
//}
//
//var doWork = function(f){
//    console.log("starting")
//    try {
//        f();
//    }catch(ex){
//        console.log(ex);
//    }
//    console.log("ending");
//};
//
//
//doWork(work);
//(function() {
//var createWorker = function(){
//    var workCount = 0;
//    var task1 = function(){
//        var count = workCount++;
//        console.log("task1 " + count);
//    };
//    
//    var task2 = function(){
//        var count2 = workCount++;
//        console.log("task2 " + count2);
//    };
//    
//    return {
//        job1: task1,
//        job2: task2
//    };
//};
//
//var worker = createWorker();
//worker.job1();
//worker.job2();
//worker.job1();
//worker.job2();
//worker.job1();
//worker.job2();
//
//}());
////
//(function(){
//    var app = angular.module("githubViewer", []);
//var MainController = function($scope) {
//    
//    var person = {
//       firstName : "John" ,
//       lastName: "Danquah-Boateng",
//        imageSrc: "../img/jb.jpg"
//    };
//    $scope.person = person;
//    $scope.message = "hello everyone. I'm using angular";
//
//};
//
//    app.controller("MainController", MainController);
//    
//}());
//
(function () {
    var app = angular.module("githubViewer", []);
    var MainController = function ($scope, $http, $interval, $log, $anchorScroll, $location) {
        
            
        var onComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url).then(onRepos, onError);
        };
        
        var onRepos = function (response) {
            $scope.repos = response.data;
            $location.hash("user-details");
            $anchorScroll();
        };
        
        var onError = function (reason) {
            $scope.error = "unable to connect";
        };
        
        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };
        
        $scope.countDownInterval = null;
        var startCountdown = function(){
          $scope.countDownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };
        
        $scope.search = function (username) {
            $log.info("Searching for " + username);
            $http.get("https://api.github.com/users/" + username).then(onComplete, onError);
            if($scope.countDownInterval) {
                $interval.cancel($scope.countDownInterval);
                $scope.countdown = null;
            }
        };
              
        
        $scope.message = "Github Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();
        
    };
    app.controller("MainController", MainController);
}());

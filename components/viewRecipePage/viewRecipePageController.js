angular.module('starvingToday').controller('viewRecipeController', ['$scope', '$http', '$state', 'dataRecipe', 'dataUser', function($scope, $http, $state, dataRecipe, dataUser)
{

    console.log("Loaded into view");

    $scope.recipe = dataRecipe.getCurrRecipe();
    $scope.recipelen = dataRecipe.getRecipeLength();
    $scope.user = dataUser.user;
    console.log($scope.recipe);

    $http.get('http://138.68.22.10:84/comments/recipe/' + $scope.recipe.recipeid).then(
      function (response) {
          var temp = [];
          Object.keys(response.data.comments).forEach(function(key) {
              temp.push(response.data.comments[key]);
          });
          $scope.comments = temp.reverse();
      },
      function (response) {
          $scope.comments = 0;
    });

    $scope.Comment = function() {
        var comment_data = {
            comment: $scope.comment.body,
            recipeid: $scope.recipe.recipeid,
            userid: $scope.user.userid,
            posterid: $scope.user.userid
        };

        var data = JSON.stringify(comment_data);

		var config = {
            withCredentials: 'true',
  			headers : {
  				'Content-Type': 'application/json;charset=UTF-8'
  			}
  		}

<<<<<<< HEAD
    console.log("recipie from viewRecipiePage: " + $scope.recipe);

    if ($scope.recipelen === 0){
      console.log("redirect?");
      $state.go("myHub");
=======
        $http.post('http://138.68.22.10:84/comments', data, config)
        .then(function(response) {
          $http.get('http://138.68.22.10:84/comments/recipe/' + $scope.recipe.recipeid).then(
            function (response) {
              console.log(response.data);
                var temp = [];
                Object.keys(response.data.comments).forEach(function(key) {
                    temp.push(response.data.comments[key]);
                });
                $scope.comments = temp.reverse();
            },
            function (response) {
                $scope.comments = 0;
          });
        });
>>>>>>> c5c26008afa388cc2fb7c09eec0dabc2f06147cf
    }
}]);

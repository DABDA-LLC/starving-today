angular.module('starvingToday').controller('userModalController' , ['$scope' , '$http' , 'dataUser' , function($scope , $http , dataUser)
{
  console.log("IN THIS MODAL");
  //user fields
  $scope.newuser = dataUser.getMyUser();
  $scope.fullname = $scope.newuser.firstname + " " + $scope.newuser.lastname;
  $scope.newbio = $scope.newuser.bio;
  $scope.newprofileimage = $scope.newuser.profileimage;
  $scope.newemail = $scope.newuser.email;

  //update User
  $scope.UpdateUser = function(){
    var user_data = $scope.newuser;
    user_data.firstname = $scope.fullname;
    user_data.lastname = "";
    user_data.bio = $scope.newbio;
    user_data.profileimage = $scope.newprofileimage;
    user_data.email = $scope.newemail;

    var data = JSON.stringify(user_data);

    var config = {
        headers : {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }

    $http.put('http://138.68.22.10:84/users/'+user_data.userid, data, config)
    .then(
      function (response) {
        if (response.status === 200) {
            $scope.responseDetails = "User info updated successfully.";
        }
      },
      function (response) {
        if (response.status === 500) {
            $scope.responseDetails = "Something went wrong with our servers!";
        } else if(response.status === 404){
            $scope.responseDetails = "Account not properly created.";
        } else {
            $scope.responseDetails = "Everything is broken. Please abandon ship.";
        }
    });
  }
}]);

angular.module("app").service("triviaSvc", function($http) {
  var baseUrl = "https://practiceapi.devmountain.com/api/trivia/questions/";

  this.getData = function(pageNum) {
    return $http({
      method: "GET",
      url: baseUrl + "?page=" + pageNum
    }).then(function(result) {
      if (result.status === 200) {
        for (var i=0; i<result.data.length; i++)
          if (result.data[i].difficulty == 1) {
            result.data[i].difficultyLv = "Easy";
            // result.data[i].green = true;
          }
          else if (result.data[i].difficulty == 2) {
            result.data[i].difficultyLv = "Medium";
            // result.data[i].yellow = true;
          }
          else {
            result.data[i].difficultyLv = "Hard";
            // result.data[i].red = true;
          }
          return result.data;
        }
      else {
        return "nodata";
      }
    })
  }

  this.addData = function(obj) {
    return $http({
      method: "POST",
      url: baseUrl,
      data: obj
    })
  }

  this.deleteData = function(id) {
    return $http({
      method: "DELETE",
      url: baseUrl + id
    })
  }

  this.updateData = function(obj, id) {
    return $http({
      method: "PUT",
      url: baseUrl + id,
      data: {
        animal: "abc"
      }
    })
  }
  // this.getRandom = function() {
  //   var s = "2318a97d";
  //   var num2 = Math.random() * 1720129 + 999999;
  //  return num2.toString(16);
  //   }
})

angular.module("app").controller("triviaCtrl", function($scope, triviaSvc) {
  $scope.search = function() {
    $scope.isTrue = !$scope.isTrue;
    //$scope.filter.question = $scope.searchBy;
  }
  $scope.getData = function(pageNum) {
    triviaSvc.getData(pageNum).then(function(result) {
        $scope.data = result;
        console.log($scope.data);
    })
  }
  $scope.currentId;
  $scope.notSetting = true;
  $scope.pageNum = 0;
  $scope.getData(0);
  $scope.update = false;
  $scope.add = false;
  $scope.firstPage = true;
  $scope.lastPage = false;
  $scope.nextPage = function() {
    $scope.pageNum++;
    $scope.getData($scope.pageNum);
    $scope.firstPage = false;
    if ($scope.data.length < 10)
      $scope.lastPage = true;
  }
  $scope.prevPage = function() {
    $scope.pageNum--;
    $scope.getData($scope.pageNum);
    $scope.lastPage = false;
    if ($scope.pageNum == 0)
      $scope.firstPage = true;
  }

  $scope.addData = function() {
    var obj = {
      animal: $scope.newQuestion.animal,
      correct_answer: $scope.newQuestion.correct_answer,
      date_entered: new Date().toString(),
      difficulty: $scope.newQuestion.difficulty,
      options: {
        1: $scope.newQuestion.options[1],
        2: $scope.newQuestion.options[2],
        3: $scope.newQuestion.options[3],
        4: $scope.newQuestion.options[4]
      },
      question: $scope.newQuestion.question
    };
    // var obj = $scope.newQuestion;
    console.log($scope.newQuestion);

    triviaSvc.addData(obj);
    $scope.reset();
  }

  $scope.deleteData = function() {
    triviaSvc.deleteData($scope.currentId);
  //  console.log($scope.currentId)
    $scope.reset();
  }

  $scope.setData = function(question) {
    $scope.notSetting = false;
    $scope.add = true;
    $scope.currentId = question._id;
    // var box = question;
    $scope.newQuestion = question;
  }

  $scope.updateData = function() {
    var obj = {
      // animal: $scope.newQuestion.animal,
      correct_answer: $scope.newQuestion.correct_answer,
      // date_entered: new Date().toString(),
      difficulty: $scope.newQuestion.difficulty,
      options: {
        1: $scope.newQuestion.options[1],
        2: $scope.newQuestion.options[2],
        3: $scope.newQuestion.options[3],
        4: $scope.newQuestion.options[4]
      },
      question: $scope.newQuestion.question
    };
    console.log($scope.newQuestion);
    //console.log($scope.currentId);
    triviaSvc.updateData(obj, $scope.currentId);
    $scope.reset();
  }

  $scope.reset = function() {
    $scope.notSetting = true;
    $scope.update = false;
    $scope.add = false;
    $scope.newQuestion = {};
  }
})

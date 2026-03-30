angular.module('studentApp', [])
.controller('StudentController', function($scope, $http) {

    $scope.students = [];
    $scope.newStudent = {};

    // Fetch students
    $scope.fetchStudents = function() {
        $http.get('http://localhost:3000/api/students')
        .then(function(response) {
            $scope.students = response.data;
        })
        .catch(function(error) {
            console.error("Error fetching data:", error);
        });
    };

    // Add student
    $scope.addStudent = function() {
        $http.post('http://localhost:3000/api/students', $scope.newStudent)
        .then(function(response) {
            $scope.students.push(response.data);
            $scope.newStudent = {};
        })
        .catch(function(error) {
            console.error("Error adding student:", error);
        });
    };

    // Load data initially
    $scope.fetchStudents();
});
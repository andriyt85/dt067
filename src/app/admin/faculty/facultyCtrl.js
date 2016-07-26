(function(){
    'use strict';

    angular.module('app')
        .controller('facultyCtrl', facultyController);
        facultyController.$inject = ['facultyService'];

    function facultyController(facultyService) {
        var self = this;
        self.list = {};
        self.faculty = {faculty_name: "", faculty_description: ""};
        self.totalFaculties = 0;
        self.currentPage = 1;
        self.facultiesPerPage = 10;
        var firstFacultyInList = 0;
        self.pageChanged = pageChanged;
        self.showErrorMessage = false;
        self.message = "Loading...";
        self.addFaculty = addFaculty;
        self.deleteFaculty = deleteFaculty;

        activate();

        function activate() {
            facultyService.getRecordsRange(self.facultiesPerPage, firstFacultyInList)
                .then(getRecordsRangeComplete, getRecordsRangeFailed);

            facultyService.countFaculties()
                .then(countFacultyComplete, rejected);
        }

        function addFaculty() {
            facultyService.addFaculty(self.faculty)
                .then(addFacultyComplete, rejected)
        }

        function deleteFaculty(faculty_id) {
            facultyService.deleteFaculty(faculty_id)
                .then(deleteFacultyComplete, rejected);
        }

        function getRecordsRangeComplete(response) {
            self.list = response.data;
        }

        function getRecordsRangeFailed(response) {
            self.showErrorMessage = true;
            self.message = "Error:" + " " + response.status + " " + response.statusText;
        }

        function countFacultyComplete(response) {
            self.totalFaculties = response.data;
        }

        function addFacultyComplete(response) {
            if(response.data.response = "ok") {
                self.faculty = {};
            }
        }

        function deleteFacultyComplete(response) {
            if(response.data.response == "ok") {
                activate();
            }
        }

        function pageChanged() {
            var begin = ((self.currentPage - 1) * self.facultiesPerPage);
            facultyService.getRecordsRange(self.facultiesPerPage, begin).then(getRecordsRangeComplete);
        }

        function rejected(response) {
            console.log(response.status + " " + response.statusText);
        }
    }
}());
(function() {
    'use strict';

    angular.module('app')
        .factory('facultyService', facultyService);
        facultyService.$inject = ['$http', 'appConstants'];

    function facultyService ($http, appConstants) {
        return {
            getFaculties: getFaculties,
            countFaculties: countFaculties,
            getRecordsRange: getRecordsRange,
            addFaculty: addFaculty,
            deleteFaculty: deleteFaculty
        };

        function getFaculties() {
            return $http.get(appConstants.getFaculties)
                .then(fulfilled, rejected);
        }

        function countFaculties() {
            return $http.get(appConstants.countFaculties)
                .then(fulfilled, rejected);
        }

        function getRecordsRange(quantity, begin) {
            return $http.get(appConstants.getRangeOfFaculties + "/" + quantity +"/" + begin)
                .then(fulfilled, rejected);
        }

        function addFaculty(data) {
            return $http.post(appConstants.addFaculty, data)
                .then(fulfilled, rejected);
        }

        function deleteFaculty(faculty_id) {
            return $http.delete(appConstants.delFaculty + faculty_id)
                .then(fulfilled, rejected);
        }

        function fulfilled(response) {
            return response;
        }

        function rejected(response) {
            return response;
        }
    }
})();
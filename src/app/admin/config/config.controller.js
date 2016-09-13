(function(){
    'use strict';

    angular
        .module('app')
        .controller('ConfigController', ConfigController);

    ConfigController.$inject = ['$uibModal','$window'];

    function ConfigController($uibModal,$window) {
        var self = this;

        //Methods
        self.set = set;


        //Variables
        self.maxNumberOfStudents = JSON.parse(localStorage.NumberOfStudents) || 200;
        self.currentObj = {};
        self.list = [];

        activate();

        function activate() {

        }

        function set(param) {
            if(param === 'NumberOfStudents') {
                localStorage.setItem(param, angular.toJson(self.maxNumberOfStudents));
            }
            $window.location.reload();
        }
    }
}());
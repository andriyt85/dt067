(function(){
    'use strict';

    angular.module('app')
        .controller('TestDetailsController', testDetailsController);
        testDetailsController.$inject = ['$stateParams', 'testDetailsService', 'testService', '$uibModal', 'ngDialog'];

        function testDetailsController($stateParams, testDetailsService, testService, $uibModal, ngDialog) {
            var self = this;

            //variables
            self.currentSubjectId = $stateParams.currentSubjectId;
            self.list = {};
            self.showMessageNoEntity = false;

            //methods
            self.getTestDetailsByTest = getTestDetailsByTest;
            self.deleteTestDetails = deleteTestDetails;
            self.showAddTestDetailsForm = showAddTestDetailsForm;
            self.showEditTestDetailsForm = showEditTestDetailsForm;


            activate();

            function activate() {
                 getOneTest().then(getTestDetailsByTest);
            }

            function getTestDetailsByTest() {
                testDetailsService.getTestDetailsByTest($stateParams.currentTestId).then(getTestDetailsByTestComplete)
            }

            function deleteTestDetails(id) {
                ngDialog.openConfirm({
                    template: 'app/partials/confirm-delete-dialog.html',
                    plain: false
                }).then(function() {
                    testDetailsService.deleteTestDetails(id).then(function() {
                        activate();
                    })
                })
            }

             function getOneTest() {
                 return testService.getOneTest($stateParams.currentTestId).then(function(response) {
                     self.currentTest = response.data[0];
                 })
             }

            function showAddTestDetailsForm() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/test-details/add-test-details.html',
                    controller: 'TestDetailsModalController as testDetails',
                    backdrop: false,
                    resolve: {
                        currentTestDetails: {},
                        availableAmountOfTaskForCurrentTest: self.availableAmountOfTaskForCurrentTest
                    }
                });
                modalInstance.result.then(function() {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Деталі тесту успішно додано!</div>'
                    });
                    self.showMessageNoEntity = false;
                    activate();
                })
            }

            function showEditTestDetailsForm(currentTestDetails) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/admin/subject/test/test-details/edit-test-details.html',
                    controller: 'TestDetailsModalController as testDetails',
                    backdrop: false,
                    resolve: {
                        currentTestDetails: currentTestDetails,
                        availableAmountOfTaskForCurrentTest: self.availableAmountOfTaskForCurrentTest
                    }
                });
                modalInstance.result.then(function() {
                    ngDialog.open({template: '<div class="ngdialog-message"> \
						  Зміни збережено!</div>'
                    });
                    activate();
                })
            }

            function getTestDetailsByTestComplete(response) {
                self.list = response.data;
                calculateAvailableTask();

                function calculateAvailableTask() {
                    self.amountOfRate = 0;
                    self.amountOfTasks = 0;

                    if(response.data.response === "no records") {
                        self.showMessageNoEntity = true;
                        self.availableAmountOfTaskForCurrentTest = self.currentTest.tasks - self.amountOfTasks;
                    } else {
                        //calculate amount of rate per current test
                        angular.forEach(self.list, function(item) {
                            self.amountOfRate += item.rate * item.tasks;
                        });

                        //calculate amount of tasks per current test
                        angular.forEach(self.list, function(item) {
                            self.amountOfTasks += parseInt(item.tasks);
                        });

                        self.availableAmountOfTaskForCurrentTest = self.currentTest.tasks - self.amountOfTasks;
                    }
                }
            }
        }
}());

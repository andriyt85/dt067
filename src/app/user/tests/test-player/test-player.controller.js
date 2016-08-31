<<<<<<< HEAD

=======
>>>>>>> 82bd5bef19a8df606e399b800074b93220b6cb2d
(function(){
    'use strict';

    angular.module('app')
        .controller('TestPlayerController', TestPlayerController);
<<<<<<< HEAD
    TestPlayerController.$inject = ['timerService', '$interval'];

    function TestPlayerController (timerService, $interval) {
        var self = this;

        //variables
        /*self.startTime;
        self.finalTime;
        self.timerValue;*/

        self.questionsArray = [0, 9, 3, 5, 8, 2];
        console.log(self.questionsArray);

        console.log('kjehdjheckjeb');


        //methods

        activate();

        function activate() {
            getStartTime();
            getFinalTime();
        }

        function getStartTime () {
            self.startTime = timerService.getStartTime();
        }

        function getFinalTime () {
            self.finalTime = timerService.getFinalTime();
        }

        $interval(function () {
            self.timerValue = timerService.getTimerValue();
        }, 1000);

    }
}());
=======

    TestPlayerController.$inject = ['loginService', 'testDetailsService', '$stateParams', 'questionsService', 'testService', 'scheduleService', 'testPlayerService', 'adminService', '$uibModal'];

    function TestPlayerController (loginService, testDetailsService, $stateParams, questionsService, testService, scheduleService, testPlayerService, adminService, $uibModal) {

        var self = this;

        //variables
        self.user_id = 0;
        self.questionId = $stateParams.currentQuestionId;
        self.groupId = $stateParams.groupId;
        self.test_id = $stateParams.currentTestId;
        self.listOfQuestions = [];
        self.checked;

        //methods


        activate();

        function activate() {
            isLogged()
                .then(checkAttempts)
                .then(getTestDetailsByTest);
        }

        function isLogged() {
            return loginService.isLogged().then(function(response) {
                self.user_id = response.data.id;
            });
        }

        function checkAttempts(){
            testPlayerService.checkAttemptsOfUser(self.user_id,self.test_id)
                .then(function(response) {
                    self.checked = response;
                });
                if(self.checked){
                    ngDialog.open({
                                template:'<div class="ngdialog-message">РџРµСЂРµРІРёС‰РµРЅР° РєС–Р»СЊРєС–СЃС‚СЊ СЃРїСЂРѕР± Р·РґР°С‚Рё С‚РµСЃС‚!</div>',
                                plain:true
                    })
                }
        }

        function getTestDetailsByTest() {
            testDetailsService.getTestDetailsByTest(self.test_id).then(getTestDetailsByTestComplete)
        }
        function getTestDetailsByTestComplete(response) {
                angular.forEach(response.data, function(testDetail) {
                    getQuestionsByLevelRand(testDetail.level, testDetail.tasks);
                });
        }

        function getQuestionsByLevelRand(levelOfQuestion, numberOfQuestions) {
            questionsService.getQuestionsByLevelRand(self.test_id, levelOfQuestion, numberOfQuestions)
                .then(function(response) {
                    angular.forEach(response.data, function(question) {
                        self.listOfQuestions.push(question);
                    });

                    angular.forEach(self.listOfQuestions, function(question, index) {
                        question.index = index + 1;
                    });
                });
        }

    }
}());

>>>>>>> 82bd5bef19a8df606e399b800074b93220b6cb2d

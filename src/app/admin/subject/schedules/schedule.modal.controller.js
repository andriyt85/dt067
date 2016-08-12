(function(){
    'use strict';

    angular.module('app')
        .controller('ScheduleModalController', scheduleModalController);
    scheduleModalController.$inject = ['scheduleService', 'groupService', '$stateParams', '$uibModalInstance', 'currentSchedule', 'ngDialog'];

        function scheduleModalController(scheduleService, groupService, $stateParams,  $uibModalInstance,  currentSchedule, ngDialog) {
            var self = this;

            //variables
            self.schedule = {};
            self.schedule.subject_id = $stateParams.currentSubjectId;
            //self.currentSchedule = currentSchedule;
            self.gpoupList = {};
            self.alreadyExistInSchedule = false;
            //self.wasNotEditScheduleMessage = false;

            //methods
            self.addSchedule = addSchedule;
            //self.updateSchedule = updateSchedule;
            self.getGroups = getGroups;
            self.cancelForm = cancelForm;

            activate();

            function activate() {
                getGroups();
            }

            function getGroups() {
                groupService.getGroups().then(function(response) {
                    self.groupList = response.data;
                })
            }

            function addSchedule() {
                scheduleService.addSchedule(self.schedule).then(function (response) {
                    if(response.data.response === 'ok') {
                        self.schedule = {};
                        $uibModalInstance.close();
                    }
                    if(response.status === 400) {
                       self.alreadyExistInSchedule = true;
                    }
                })
            }

            function cancelForm() {
                $uibModalInstance.dismiss();
            }

    }
}());

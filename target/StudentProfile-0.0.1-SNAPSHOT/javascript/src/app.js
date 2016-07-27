var app = angular.module("StudentProfileForntEnd", ['ui.bootstrap']);


app.factory('studentUrlFactory', function ($q, $window) {
	 var serviceCalls = {};
	 
	 serviceCalls.getStudentListDao = function () {
         return "http://localhost:8080/StudentProfile/getStudentsList.json";
     };
     
     serviceCalls.getStudentDao = function () {
         return "http://localhost:8080/StudentProfile/getStudent.json";
     };
     
     serviceCalls.saveStudentDao = function () {
         return "http://localhost:8080/StudentProfile/saveStudent.json";
     };
     
     serviceCalls.updateStudentDao = function () {
         return "http://localhost:8080/StudentProfile/updateStudent.json";
     };
     
     serviceCalls.removeStudentDao = function () {
         return "http://localhost:8080/StudentProfile/removeStudent.json";
     };

     
     return serviceCalls;
});

app.service('studentDataService', ['$q', '$window','$http', 'studentUrlFactory', function ($q, $window, $http, studentUrlFactory) {
	var postRequest = function (url, data) {
        return $http.post(url,data? data:{});
    };
	
    var getRequest = function (url, data) {
        return $http.get(url,data? data:{});
    }; 
    
	var _getStudentList = function (d) {
        return getRequest(studentUrlFactory.getStudentListDao(), d);
    };
    
    var _getStudent = function (d) {
        return postRequest(studentUrlFactory.getStudentDao(), d);
    };
    
    var _updateStudent = function (d) {
        return postRequest(studentUrlFactory.updateStudentDao(), d);
    };
    
    var _saveStudent = function (d) {
        return postRequest(studentUrlFactory.saveStudentDao(), d);
    };
    
    var _removeStudent = function (d) {
        return postRequest(studentUrlFactory.removeStudentDao(), d);
    }; 
    
    return{
    	getStudentList: _getStudentList,
    	updateStudent : _updateStudent,
    	saveStudent   : _saveStudent,
    	removeStudent : _removeStudent,
    	getStudent    :_getStudent
    };
	  
}]);

app.service('confirmModalService', ['$modal',function ($modal) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'html/ConfirmDialog.html',
        size: 'sm'
    };

    var modalOptions = {};

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {

        var tempModalDefaults = {};
        var tempModalOptions = {};


        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);


        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.student = tempModalOptions.studentData;
                
                $scope.modalOptions.ok = function (result) {
            			$modalInstance.close(1);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss();
                };
            };
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);


app.service('addModalService', ['$modal','studentDataService', function ($modal,studentDataService) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'html/AddNewStudent.html',
        size: 'lg'
    };

    var modalOptions = {};

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {

        var tempModalDefaults = {};
        var tempModalOptions = {};


        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);


        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.student = tempModalOptions;
                $scope.student = {};
                $scope.test = {};
                $scope.test.email = false;
                $scope.test.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACqCAIAAAG33BH1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUYzQTM4REVERDQzNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENjc3MTJBRTNFMjgxMUUzQkEwQ0RDRjE0MkYyM0FDRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMkUxNzRBNjNFMjgxMUUzQkEwQ0RDRjE0MkYyM0FDRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDI4MDExNzQwNzIwNjgxMTgyMkFGM0EzOERFREQ0MzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFGM0EzOERFREQ0MzUiLz4gPC9yZGY6RGVzY3Jp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"
                $scope.modalOptions.ok = function (result) {
                	
                	studentDataService.saveStudent($scope.student).
            		success(function(data) {
            			if(data == "true"){
            				$scope.test.email = false;
            				$modalInstance.close(result);
            			}else{
            				$scope.test.email = true;
            			}
            			
            		});
                	
                    
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
                
                $scope.uploadFile = function () {
                    var fd = new FormData();
                    for (var i in $scope.files) {
                        fd.append(i, $scope.files[i]);
                    }

                    fd.file = $scope.files[0];
                    fd.upload_file = '';
                    var data = '';
                    var r;
                    r = new FileReader();
                    r.onloadend = function (e) {
                    	$scope.$apply(function () {
                    	$scope.test.image = e.target.result;
                    	});
                    };
                    r.readAsDataURL($scope.files[0]);

                };
                
                $scope.setFiles = function (element) {
                    $scope.$apply(function (scope) {
                        console.log('files:', element.files);
                        scope.files = [];
                        for (var i = 0; i < element.files.length; i++) {
                            if (element.files[i].type == "image/jpeg" || element.files[i].type == "image/png") {
                            	 $scope.files.push(element.files[i]);
                            	 $scope.uploadFile();
                            } 

                        }
                    });
                };
                
                
            };
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);



app.service('modalService', ['$modal','studentDataService', function ($modal,studentDataService) {

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'html/ViewStudentProfile.html',
        size: 'lg'
    };

    var modalOptions = {};

    this.showModal = function (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    this.show = function (customModalDefaults, customModalOptions) {

        var tempModalDefaults = {};
        var tempModalOptions = {};


        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);


        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {
            tempModalDefaults.controller = function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.student = tempModalOptions.studentData;
                $scope.test = {};
                $scope.test.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACqCAIAAAG33BH1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMTgwMTE3NDA3MjA2ODExODIyQUYzQTM4REVERDQzNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpENjc3MTJBRTNFMjgxMUUzQkEwQ0RDRjE0MkYyM0FDRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMkUxNzRBNjNFMjgxMUUzQkEwQ0RDRjE0MkYyM0FDRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDI4MDExNzQwNzIwNjgxMTgyMkFGM0EzOERFREQ0MzUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDE4MDExNzQwNzIwNjgxMTgyMkFGM0EzOERFREQ0MzUiLz4gPC9yZGY6RGVzY3Jp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"
               
                	
                	 $scope.uploadFile = function () {
                    var fd = new FormData();
                    for (var i in $scope.files) {
                        fd.append(i, $scope.files[i]);
                    }

                    fd.file = $scope.files[0];
                    fd.upload_file = '';
                    var data = '';
                    var r;
                    r = new FileReader();
                    r.onloadend = function (e) {
                    	$scope.$apply(function () {
                    	$scope.test.image = e.target.result;
                    	});
                    };
                    r.readAsDataURL($scope.files[0]);

                };
                
                $scope.setFiles = function (element) {
                    $scope.$apply(function (scope) {
                        console.log('files:', element.files);
                        scope.files = [];
                        for (var i = 0; i < element.files.length; i++) {
                            if (element.files[i].type == "image/jpeg" || element.files[i].type == "image/png") {
                            	 $scope.files.push(element.files[i]);
                            	 $scope.uploadFile();
                            } 

                        }
                    });
                };
                
                	
                	
                $scope.modalOptions.ok = function (result) {
                	
                	studentDataService.updateStudent($scope.student).
            		success(function(data) {
            			$modalInstance.close(result);
            		});
                	
                    
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            };
        }

        return $modal.open(tempModalDefaults).result;
    };

}]);

app.controller("studentsCtrl", ['$scope','studentDataService','modalService','addModalService','confirmModalService', function($scope, studentDataService, modalService, addModalService, confirmModalService) {
	$scope.loading = function(){
		studentDataService.getStudentList().
		success(function(data) {
			$scope.StudentsList = data;
		});
	}
	
	$scope.loading();
	
	
	$scope.selectStudents = function(student){
		studentDataService.getStudent(student).
		success(function(data) {
			 var modalOptions = {
	                 closeButtonText: 'Close',
	                 actionButtonText: 'Update',
	                 headerText: 'Edit '+data.name,
	                 studentData : data
	                 };
			 modalService.showModal({}, modalOptions).then(function (result) {
				 $scope.loading();
	          });
		});
		
		
		
	}
	
	
	$scope.addStudent = function(){

			 var modalOptions = {
	                 closeButtonText: 'Close',
	                 actionButtonText: 'Save',
	                 headerText: 'Add New Student',
			 };
			 addModalService.showModal({}, modalOptions).then(function (result) {
				 $scope.loading();
	          });
		
	}
	
	
	$scope.removeStudent = function(student){

		 var modalOptions = {
                closeButtonText: 'No',
                actionButtonText: 'Yes',
                headerText: 'Confirmation',
                bodyText : 'Are you sure you want to delete this?'
		 };
		 confirmModalService.showModal({}, modalOptions).then(function (result) {
			if(result){
				studentDataService.removeStudent(student).
				success(function(data) {
					$scope.loading();
				});
			}
         });
	
	}
	
	
	
}]);


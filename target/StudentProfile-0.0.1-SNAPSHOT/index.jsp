<!doctype html>
<html ng-app="StudentProfileForntEnd">
<head>
    <title>Student Profile</title>
    <link rel='stylesheet' href='css/bootstrap.css'/>
    <link rel='stylesheet' href='css/style.css'/>
     <link rel='stylesheet' href='css/font-awesome/css/font-awesome.css'/>

    <script src="javascript/libs/jquery/dist/jquery.min.js"></script>
    <script src="javascript/libs/angular/angular.min.js"></script>
    <script src="javascript/libs/angular-bootstrap/ui-bootstrap-tpls.min.js"></script>
    <script src="javascript/src/app.js"></script>
</head>

<body>

<div ng-controller="studentsCtrl" class="centered">
    <div class="row">
<div class="col-md-1"></div>
        <div class="col-md-10">


            <div class="panel panel-success">
                <div class="panel-heading">Student List</div>
                <div class="panel-body">
                    <div class="portlet-body flip-scroll" ng-show="StudentsList.length > 0">
                        <table class="table table-bordered table-striped table-condensed flip-content">
                            <thead class="flip-content">
                            <tr>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Phone No</th>
                                <th>&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr ng-repeat="student in StudentsList">
                                <td>{{student.name}}</td>
                                <td>{{student.emailAddress}}</td>
                                <td>{{student.phone}}</td>
                                <td align="center">
                                    <span><button ng-click="selectStudents(student)" class="btn btn-success detail-btn"><i
                                            class="fa fa-list"></i></button>
                                            </span>
                                    <span><button ng-click="removeStudent(student)" class="btn btn-danger detail-btn"><i
                                            class="fa fa-times"></i></button>
                                            </span>
                                            
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="portlet-body flip-scroll" ng-hide="StudentsList.length > 0">
                        <h5>No Records Found!</h5>
                    </div>
                    <div  class="portlet-body flip-scroll">
                    	<button class="btn btn-info" ng-click="addStudent()"><i
                                            class="fa fa-plus"></i></button> Add New Student</button>
                    </div>
                </div>
                <div class="panel-footer"></div>
            </div>



        </div>
    </div>
</div>
</body>
</html>
package cinglevue.coding.challenge.controller;


import java.util.List; 

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import cinglevue.coding.challenge.model.Student;
import cinglevue.coding.challenge.persistence.StudentPersist;

@RestController
public class StudentController {
	
	StudentPersist studentPersist = new StudentPersist();
	
	@RequestMapping("/getStudentsList")
	public List<Student> getStudentsList(){
		List<Student> students = studentPersist.getStudentList();
		return students;
	}

	@RequestMapping(value = "/saveStudent", method = RequestMethod.POST)
	public boolean addStudent(@RequestBody Student stdnt){
		return studentPersist.saveStudent(stdnt);
	}
	
	@RequestMapping(value = "/getStudent", method = RequestMethod.POST)
	public Student getStudent(@RequestBody Student stdnt){
		Student requestStudent = studentPersist.getStudent(stdnt);
		return requestStudent;
	}
	
	@RequestMapping(value = "/updateStudent", method = RequestMethod.POST)
	public boolean updateStudent(@RequestBody Student stdnt){
		studentPersist.updateStudent(stdnt);
		return true;
	}
	
	@RequestMapping(value = "/removeStudent", method = RequestMethod.POST)
	public boolean removeStudent(@RequestBody Student stdnt){
		studentPersist.removeStudent(stdnt);
		return true;
	}
}

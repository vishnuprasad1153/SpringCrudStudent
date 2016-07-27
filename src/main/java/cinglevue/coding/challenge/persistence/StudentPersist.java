package cinglevue.coding.challenge.persistence;

import java.util.List; 

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
 
import cinglevue.coding.challenge.SpringMongoConfig;
import cinglevue.coding.challenge.model.Student;

 
public class StudentPersist {
 
	private MongoOperations mongoOperation;
	private ApplicationContext ctx;

	public StudentPersist(){
		ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
		mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");
	}
	

	public boolean saveStudent(Student newStudent){
		Query searchUserQuery = new Query(Criteria.where("emailAddress").is(newStudent.getEmailAddress()));
		Student exsistStudent = mongoOperation.findOne(searchUserQuery, Student.class);
		if(exsistStudent == null){
			mongoOperation.save(newStudent);
			return true;
		}else{
			return false;
		}
		
	}
 
	public Student getStudent(Student stdnt){
		Query searchUserQuery = new Query(Criteria.where("emailAddress").is(stdnt.getEmailAddress()));
		Student getStudent = mongoOperation.findOne(searchUserQuery, Student.class);
		return getStudent;
	}
	
	public List<Student> getStudentList(){
		List<Student> studentList = mongoOperation.findAll(Student.class);
		return studentList;
	}
	
	public void updateStudent(Student updateStudent){
		Query searchUserQuery = new Query(Criteria.where("emailAddress").is(updateStudent.getEmailAddress())); //TODO
		Update update = new Update();
		update.set("name", updateStudent.getName());
		update.set("phone", updateStudent.getPhone());
		update.set("dob", updateStudent.getDob());
		update.set("image", updateStudent.getImage());
		
		mongoOperation.updateFirst(searchUserQuery, update, Student.class);
	}
	
	public void removeStudent(Student removeStudent){
		Query searchUserQuery = new Query(Criteria.where("emailAddress").is(removeStudent.getEmailAddress())); //TODO
		mongoOperation.remove(searchUserQuery, Student.class);
	}
 
 
}
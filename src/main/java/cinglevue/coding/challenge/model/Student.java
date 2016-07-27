package cinglevue.coding.challenge.model;

import org.springframework.data.annotation.Id; 
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "student")
public class Student {
	@Id
	private String id;
	
	private String name;
	
	private String emailAddress;

	private String phone;
	
	private String dob;
	
	private byte[] image;
	
	
	
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}
}

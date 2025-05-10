package klu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
@Table(name="jobs")
public class Jobs 
{
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
@Column(name="id")
Long id;
@Column(name="title")
String title;
@Column(name="company")
String company;
@Column(name="location")
String location;
@Column(name="jobtype")
String jobtype;
@Column(name="salary")
String salary;
@Column(name="description")
String description;
public Long getId() {
  return id;
}
public void setId(Long id) {
  this.id = id;
}
public String getTitle() {
  return title;
}
public void setTitle(String title) {
  this.title = title;
}
public String getCompany() {
  return company;
}
public void setCompany(String company) {
  this.company = company;
}
public String getLocation() {
  return location;
}
public void setLocation(String location) {
  this.location = location;
}
public String getJobtype() {
  return jobtype;
}
public void setJobtype(String jobtype) {
  this.jobtype = jobtype;
}
public String getSalary() {
  return salary;
}
public void setSalary(String salary) {
  this.salary = salary;
}
public String getDescription() {
  return description;
}
public void setDescription(String description) {
  this.description = description;
}

}
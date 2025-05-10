package klu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.*;

@Entity
@Table(name="roles")
public class Roles
{
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
@Column(name="id")
Long id;
@Column(name="role")
int role;
@ManyToOne
@JoinColumn(name="mid")
Menus menus;

public Long getId() {
  return id;
}
public void setId(Long id) {
  this.id = id;
}
public int getRole() {
  return role;
}
public void setRole(int role) {
  this.role = role;
}
public Menus getMenus() {
  return menus;
}
public void setMenus(Menus menus) {
  this.menus = menus;
}

}
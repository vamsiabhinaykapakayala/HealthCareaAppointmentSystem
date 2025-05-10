package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import klu.model.Jobs;
import klu.model.JobsManager;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins="*")
public class JobsController
{
@Autowired
JobsManager JM;
@PostMapping("/create")
public String create(@RequestBody Jobs J)
{
  return JM.createJob(J);
}


}
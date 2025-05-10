package klu.model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import klu.repository.*;
@Service
public class JobsManager
{
@Autowired
JobsRepository JR;
public String createJob(Jobs J)
{
  try
  {
    JR.save(J);
    return "200::New job has been created";
  }
  catch(Exception e)
  {
    return "404::"+e.getMessage();
  }
}

}
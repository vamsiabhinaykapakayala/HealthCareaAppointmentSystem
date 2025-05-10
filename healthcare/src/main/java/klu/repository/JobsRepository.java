package klu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import klu.model.*;
@Repository
public interface JobsRepository extends JpaRepository<Jobs,Long>
{

}
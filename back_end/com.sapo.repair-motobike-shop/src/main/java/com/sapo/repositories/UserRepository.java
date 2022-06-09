package com.sapo.repositories;

import com.sapo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
  @Query(value = "select tbl_users.* from tbl_users where tbl_users.status = ?1   AND LCASE(CONCAT(tbl_users.name, ' ', tbl_users.phone, ' ', tbl_users.username, ' ', tbl_users.code, ' ', tbl_users.email)) LIKE LCASE('%' ?2 '%')", nativeQuery = true)
  List<User> findUsersByStatus(int status, String keyword);
  Optional<User> findByUsername(String username);
  Boolean existsByUsername(String username);

}

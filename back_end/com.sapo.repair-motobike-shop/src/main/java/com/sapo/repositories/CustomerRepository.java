package com.sapo.repositories;


import com.sapo.entities.Customer;
import com.sapo.entities.MaterialOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>, JpaSpecificationExecutor<Customer> {
  @Query(value = "select tbl_customers.* from tbl_customers where tbl_customers.id = ?", nativeQuery = true)
  Customer findCustomerById(int id);
  
  @Query(value = "select tbl_customers.* from tbl_customers where tbl_customers.phone = ?", nativeQuery = true)
  Customer findCustomerByPhone(String phone);
}

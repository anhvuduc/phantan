package com.sapo.dao.jpa;

import com.sapo.entities.Customer;
import com.sapo.entities.User;
import com.sapo.entities.Vehicle;
import com.sapo.services.impl.CustomerServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "CustomerDAO")
@Transactional(rollbackOn = Exception.class)
public class CustomerDAO {
  @PersistenceContext
  private EntityManager entityManager;
  private static final Logger LOGGER = LoggerFactory.getLogger(CustomerServiceImpl.class.toString());
  
  //hàm tìm Customer keyword
  public List<Customer> findCustomerByKeyword(String keyword){
    String sql = "SELECT * FROM tbl_customers where 1 = 1 ";
    
    if(keyword != null && keyword.length() !=0 ){
      sql = sql + "AND  LCASE(CONCAT(tbl_customers.code, ' ', tbl_customers.name , ' ', tbl_customers.phone)) LIKE LCASE('%" + keyword + "%')";
    }
    Query query = entityManager.createNativeQuery(sql, Customer.class);
    List<Customer> customers = query.getResultList();
    return customers;
  }

  //hàm tìm Customer keyword và idVehicle
  public List<Customer> findCustomerByKeywordAndIdVehicle(String keyword, int idVehicle){
    String sql = "SELECT * FROM tbl_customers,tbl_vehicle_customer,tbl_vehicles  " +
            " WHERE tbl_vehicle_customer.customer_id = tbl_customers.id " +
            " AND tbl_vehicle_customer.vehicle_id = tbl_vehicles.id " +
            " AND tbl_vehicles.id = " +idVehicle;

    if(keyword != null && keyword.length() !=0 ){
      sql = sql + " AND  LCASE(CONCAT(tbl_customers.name, ' ', tbl_customers.phone, ' ', tbl_customers.code)) LIKE LCASE('%" + keyword + "%')";
    }
    Query query = entityManager.createNativeQuery(sql, Customer.class);
    List<Customer> customers = query.getResultList();
    return customers;
  }

  //hàm tìm Customer keyword và idVehicle
  public List<Customer> findCustomerByKeywordAndIdVehicle(String keyword){
    String sql = "SELECT * FROM tbl_customers WHERE 1 =1 ";

    if(keyword != null && keyword.length() !=0 ){
      sql = sql + " AND  LCASE(CONCAT(tbl_customers.name, ' ', tbl_customers.phone, ' ', tbl_customers.code)) LIKE LCASE('%" + keyword + "%')";
    }
    Query query = entityManager.createNativeQuery(sql, Customer.class);
    List<Customer> customers = query.getResultList();
    return customers;
  }
  //Hàm tìm customers
  public List<Customer> findAllCustomerExist(){
    String sql = "SELECT * FROM tbl_customers";
    Query query = entityManager.createNativeQuery(sql, Customer.class);
    return query.getResultList();
  }
  
  // Hàm tìm Customer bằng id
  public Customer findCustomerById(int id){
    String sql = "SELECT * FROM tbl_customers where id = "+ id;
    Query query = entityManager.createNativeQuery(sql, Customer.class);
    return (Customer) query.getSingleResult();
  }

  //Hàm tìm cutomer bằng code
  public Customer findCustomerByCode(String code){
    String sql = "SELECT * FROM tbl_customers where code = '"+ code +"'";
    Query query = entityManager.createNativeQuery(sql, Customer.class);
    return (Customer) query.getSingleResult();
  }

}

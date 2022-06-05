package com.sapo.dao.jpa;

import com.sapo.entities.Vehicle;
import com.sapo.entities.VehicleCustomer;
import com.sapo.services.impl.VehicleCustomerServiceImpl;
import com.sapo.services.impl.VehicleServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "VehicleCustomerDAO")
@Transactional(rollbackOn = Exception.class)
public class VehicleCustomerDAO {
  @PersistenceContext
  private EntityManager entityManager;
  private static final Logger LOGGER = LoggerFactory.getLogger(VehicleCustomerServiceImpl.class.toString());
  
  
  // Hàm tìm VehicleCustomer bằng id
  public VehicleCustomer findVehicleCustomerById(int id){
    String sql = "SELECT * FROM tbl_vehicle_customer where id = "+ id;
    Query query = entityManager.createNativeQuery(sql, VehicleCustomer.class);
    return (VehicleCustomer) query.getSingleResult();
  }
  
  // Hàm tìm VehicleCustomer bằng vehicleId
  public List<VehicleCustomer> findVehicleCustomerByVehicleId(int id){
    String sql = "SELECT * FROM tbl_vehicle_customer where tbl_vehicle_customer.vehicle_id = "+ id;
    Query query = entityManager.createNativeQuery(sql, VehicleCustomer.class);
    return query.getResultList();
  }
}

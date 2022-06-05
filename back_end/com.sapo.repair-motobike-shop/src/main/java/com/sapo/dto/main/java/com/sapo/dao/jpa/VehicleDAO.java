package com.sapo.dao.jpa;


import com.sapo.entities.Customer;
import com.sapo.entities.Vehicle;
import com.sapo.entities.VehicleCustomer;
import com.sapo.services.impl.VehicleServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "VehicleDAO")
@Transactional(rollbackOn = Exception.class)
public class VehicleDAO {
  @PersistenceContext
  private EntityManager entityManager;
  private static final Logger LOGGER = LoggerFactory.getLogger(VehicleServiceImpl.class.toString());
  
  //hàm tìm Vehicle keyword
  public List<Vehicle> findVehicleByKeyword(String keyword){
    String sql = "SELECT * FROM tbl_vehicles where 1 = 1 ";
    
    if(keyword != null && keyword.length() !=0 ){
      sql = sql + "AND  LCASE(CONCAT(tbl_vehicles.license_plate, ' ', tbl_vehicles.code)) LIKE LCASE('%" + keyword + "%')";
    }
      Query query = entityManager.createNativeQuery(sql, Vehicle.class);
      List<Vehicle> vehicles = query.getResultList();
      return vehicles;
  }

    //Hàm tìm vehicleCustomer
    public VehicleCustomer findVehicleCustomerById(int id){
        String sql = "SELECT * FROM tbl_vehicle_customer where id = "+ id;
        Query query = entityManager.createNativeQuery(sql, VehicleCustomer.class);
        return (VehicleCustomer) query.getSingleResult();
    }

    //Hàm tìm Vehicle
    public List<Vehicle> findAllVehicle(String keyword){
        String sql = "SELECT * FROM tbl_vehicles where 1=1 ";
        if(keyword != null && keyword.length() !=0 ){
            sql = sql + "AND  LCASE(CONCAT(tbl_vehicles.license_plate, ' ', tbl_vehicles.code)) LIKE LCASE('%" + keyword + "%')";
        }
        Query query = entityManager.createNativeQuery(sql, Vehicle.class);
        return  query.getResultList();
    }

    //hàm tìm vehicle bằng Biển số
    public Vehicle findVehicleByLicensePlate(String licensePlate){
        String sql = "SELECT * FROM tbl_vehicles where license_plate = '"+ licensePlate +"'";
        Query query = entityManager.createNativeQuery(sql, Vehicle.class);
        return (Vehicle) query.getSingleResult();
    }

    //Hàm tìm vehicle_customer bằng id_vehicle và id_customer
    public VehicleCustomer findVehicleCustomerByIdVehicleAndIdCustomer(int idCustomer, int idVehicle ){
        String sql = "SELECT * FROM tbl_vehicle_customer where vehicle_id = "+ idVehicle +" AND customer_id = " +idCustomer;
        Query query = entityManager.createNativeQuery(sql, VehicleCustomer.class);
        return (VehicleCustomer) query.getSingleResult();
    }


  
  //Hàm tìm Vehicle
  public List<Vehicle> findAllVehicleExist(){
    String sql = "SELECT * FROM tbl_vehicles";
    Query query = entityManager.createNativeQuery(sql, Vehicle.class);
    return query.getResultList();
  }
  
  // Hàm tìm Vehicle bằng id
  public Vehicle findVehicleById(int id){
    String sql = "SELECT * FROM tbl_vehicles where id = "+ id;
    Query query = entityManager.createNativeQuery(sql, Vehicle.class);
    return (Vehicle) query.getSingleResult();
  }

  //Hàm tìm vehicle_customer bằng id customer
  public VehicleCustomer findVehicleCustomerByIdCustomer(int id) {
      String sql = "SELECT * FROM tbl_vehicle_customer where customer_id = "+ id;
      Query query = entityManager.createNativeQuery(sql, VehicleCustomer.class);
      return (VehicleCustomer) query.getSingleResult();
  }
}

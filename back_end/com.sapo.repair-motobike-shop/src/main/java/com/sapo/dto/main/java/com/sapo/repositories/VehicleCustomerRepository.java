package com.sapo.repositories;


import com.sapo.entities.Vehicle;
import com.sapo.entities.VehicleCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleCustomerRepository extends JpaRepository<VehicleCustomer, Integer>, JpaSpecificationExecutor<VehicleCustomer> {
  @Query(value = "select tbl_vehicle_customer.* from tbl_vehicle_customer where tbl_vehicle_customer.vehicle_id = ?", nativeQuery = true)
  List<VehicleCustomer> findVehicleCustomerByVehicleId(int id);
}

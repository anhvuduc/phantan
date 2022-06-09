package com.sapo.repositories;

import com.sapo.entities.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer>, JpaSpecificationExecutor<Vehicle> {
  @Query(value = "select tbl_vehicles.* from tbl_vehicles where tbl_vehicles.id = ?", nativeQuery = true)
  Vehicle findVehicleById(int id);
  
  @Query(value = "select tbl_vehicles.* from tbl_vehicles where tbl_vehicles.license_plate = ?", nativeQuery = true)
  Vehicle findVehicleBylicensePlate(String licensePlate);
}

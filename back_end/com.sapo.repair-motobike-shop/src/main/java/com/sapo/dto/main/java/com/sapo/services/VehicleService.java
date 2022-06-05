package com.sapo.services;


import com.sapo.dto.customers.VehicleListResponseDTO;

import com.sapo.dto.vehicle.VehiclePaginationDTO;
import com.sapo.entities.Vehicle;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VehicleService {

    List<VehicleListResponseDTO> getListVehicle(String keyword);

  //Hàm lấy list Vehicle
  List<Vehicle> findAllListVehicle(String keyword);
  
  //Hàm tìm Customer bằng id
  Vehicle findVehicleById(int id);
  
  //Hàm search Customer
  VehiclePaginationDTO searchVehicle(int page, int limit, String keyword);
}

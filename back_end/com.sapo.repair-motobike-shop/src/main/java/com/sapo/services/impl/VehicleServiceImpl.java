package com.sapo.services.impl;

import com.sapo.dao.jpa.VehicleDAO;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.customers.VehicleListResponseDTO;
import com.sapo.dto.vehicle.VehicleDTOResponse;
import com.sapo.dto.vehicle.VehiclePaginationDTO;
import com.sapo.entities.Vehicle;
import com.sapo.repositories.VehicleRepository;
import com.sapo.services.VehicleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleDAO vehicleDAO;
    private final VehicleRepository vehicleRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());

    public VehicleServiceImpl(VehicleDAO vehicleDAO, VehicleRepository vehicleRepository) {
        this.vehicleDAO = vehicleDAO;
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public List<VehicleListResponseDTO> getListVehicle(String keyword){
        List<Vehicle> vehicles = vehicleDAO.findAllVehicle(keyword);
        List<VehicleListResponseDTO> vehicleDTOS = transferVehicleToVehicleDTOInvoice(vehicles);
        return vehicleDTOS;
    }

    private List<VehicleListResponseDTO> transferVehicleToVehicleDTOInvoice(List<Vehicle> vehicles){
        List<VehicleListResponseDTO> vehicleDTOS = new ArrayList<>();
        for (Vehicle vehicle : vehicles){
            VehicleListResponseDTO vehicleDTO = new VehicleListResponseDTO(vehicle.getId(), vehicle.getCode(), vehicle.getLicensePlate());
            vehicleDTOS.add(vehicleDTO);
        }
        return vehicleDTOS;
    }

  
  //Hàm tìm Vehicle bằng id
  @Override
  public Vehicle findVehicleById(int id){
    Vehicle vehicle = vehicleDAO.findVehicleById(id);
    return vehicle;
  }
  
  //Hàm search vehicle
  @Override
  public VehiclePaginationDTO searchVehicle(int page, int limit, String keyword){
    VehiclePaginationDTO vehiclePaginationDTO = new VehiclePaginationDTO();
    List<Vehicle> vehicles = vehicleDAO.findVehicleByKeyword(keyword);
    vehiclePaginationDTO = findAllVehicleDTO(page, limit, vehicles);
    return vehiclePaginationDTO;
  }
  
  
  // Chuyển Vehicle sang VehicleDTO
  private List<VehicleDTOResponse> transferVehicleToVehicleDTO(List<Vehicle> vehicles){
    List<VehicleDTOResponse> vehicleDTOResponses = new ArrayList<>();
  
    vehicles.forEach(vehicle -> {
      if (vehicle.getLicensePlate() == null ){
        vehicle.setLicensePlate(" ");
      }
      VehicleDTOResponse vehicleDTOResponse = new VehicleDTOResponse(vehicle.getId(), vehicle.getCode(), vehicle.getLicensePlate());
      vehicleDTOResponses.add(vehicleDTOResponse);
    });
    return vehicleDTOResponses;
  }
  
  // Chuyển Vehicle sang VehicleDTO
  private VehiclePaginationDTO findAllVehicleDTO(int page, int limit, List<Vehicle> vehicles){
    List<VehicleDTOResponse> vehicleDTOResponses = transferVehicleToVehicleDTO(vehicles);
    VehiclePaginationDTO vehiclePaginationDTO = findAllVehiclePaginationDTO(page,  limit, vehicleDTOResponses);
    return vehiclePaginationDTO;
  }
  
  private VehiclePaginationDTO findAllVehiclePaginationDTO (int page, int limit, List<VehicleDTOResponse> vehicleDTOS){
    List<VehicleDTOResponse> vehicleDTOList = new ArrayList<VehicleDTOResponse>();
    if ((vehicleDTOS.size() - (page * limit - limit)) > limit) {
      for (int i = page * limit - limit; i < page * limit; i++) {
        vehicleDTOList.add(vehicleDTOS.get(i));
      }
    } else {
      for (int i = page * limit - limit; i < vehicleDTOS.size(); i++) {
        vehicleDTOList.add(vehicleDTOS.get(i));
      }
    }
    Pagination pagination = new Pagination(page, limit, vehicleDTOS.size());
    VehiclePaginationDTO vehiclePaginationDTO = new VehiclePaginationDTO(vehicleDTOList, pagination);
    return vehiclePaginationDTO;
  }
  
  
  
  //Hàm lưu Vehicle bằng VehicleRepository
  private void saveVehicleRepository(Vehicle vehicle){
    try{
      vehicleRepository.save(vehicle);
    }catch (Exception e){
      LOGGER.error("ERROR: {} | Save vehicle", vehicle);
    }
  }
  
  //Hàm lấy list vehicle bằng repository
  @Override
  public List<Vehicle> findAllListVehicle(String keyword){
    List<Vehicle> vehicles = vehicleDAO.findVehicleByKeyword(keyword);
    return vehicles;
  }

}

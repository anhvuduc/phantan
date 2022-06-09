package com.sapo.services;


import com.sapo.dto.vehiclecustomers.VehicleCustomerDTORequest;
import com.sapo.dto.vehiclecustomers.VehicleCustomerDTOResponse;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface VehicleCustomerService {
  //Hàm tạo VehicleCustomer
  void saveVehicleCustomer(VehicleCustomerDTORequest vehicleCustomerDTORequest);
  
  //lấy list customer bằng vehicleId
  VehicleCustomerDTOResponse findListCustomerByVehicleId(int id);
}

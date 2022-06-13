package com.sapo.controllers.staff;

import com.sapo.dto.vehiclecustomers.VehicleCustomerDTORequest;
import com.sapo.dto.vehiclecustomers.VehicleCustomerDTOResponse;
import com.sapo.services.VehicleCustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/vehicle-customer")
@PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
public class VehicleCustomerController {
  private final VehicleCustomerService vehicleCustomerService;
  
  public VehicleCustomerController(VehicleCustomerService vehicleCustomerService) {
    this.vehicleCustomerService = vehicleCustomerService;
  }
  
  //API tạo VehicleCustomer mới
  @PostMapping
  public ResponseEntity<Void> addNewVehicleCustomer(@Valid @RequestBody VehicleCustomerDTORequest vehicleCustomerDTORequest) {
    vehicleCustomerService.saveVehicleCustomer(vehicleCustomerDTORequest);
    return ResponseEntity.ok().build();
  }
  
  //API lấy list customer bằng vehicleId
  @GetMapping("/{vehicle-id}")
  public ResponseEntity<VehicleCustomerDTOResponse> getListCustomerByVehicleId(@PathVariable("vehicle-id") int id) {
    VehicleCustomerDTOResponse vehicleCustomerDTOResponse = vehicleCustomerService.findListCustomerByVehicleId(id);
    return ResponseEntity.ok(vehicleCustomerDTOResponse);
  }
  
  
  
}

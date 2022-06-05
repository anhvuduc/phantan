package com.sapo.controllers.staff;

import com.sapo.dto.services.ServiceDTOResponse;
import com.sapo.dto.services.ServiceListInvoiceResponseDTO;
import com.sapo.entities.Service;
import com.sapo.services.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin("http://localhost:3000")
public class ServiceController {
    private final ServiceService serviceService;
    
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }
    
    //API lấy list service đang sử dụng
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('COORDINATOR')" )
    @GetMapping("/still-serving")
    public ResponseEntity<List<ServiceListInvoiceResponseDTO>> listServiceStillServing(@RequestParam String keyword){
        List<ServiceListInvoiceResponseDTO> serviceDTOResponse = serviceService.searchListServiceStillServing(keyword);
        return ResponseEntity.ok(serviceDTOResponse);
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('COORDINATOR')" )
    //API tìm service bằng id
    @GetMapping("/{id}")
    public ResponseEntity<Service> findServiceById(@PathVariable("id") int id){
        Service service = serviceService.findServiceById(id);
        return ResponseEntity.ok(service);
    }



}

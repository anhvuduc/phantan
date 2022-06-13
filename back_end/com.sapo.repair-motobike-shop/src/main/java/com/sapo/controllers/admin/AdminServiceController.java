package com.sapo.controllers.admin;

import com.sapo.dto.services.ServiceDTORequest;
import com.sapo.dto.services.ServiceDTOUpdateRequest;
import com.sapo.dto.services.ServicePaginationDTO;
import com.sapo.dto.users.UserDTOUpdateRequest;
import com.sapo.entities.Service;
import com.sapo.services.ServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/services")
@PreAuthorize("hasRole('ADMIN')")
public class AdminServiceController {
    private final ServiceService serviceService;
    
    public AdminServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }
    
    // tim tat ca cac service va phan trang
    @GetMapping("/list")
    public ResponseEntity<ServicePaginationDTO> listServicePagination(@RequestParam int page , @RequestParam int limit, @RequestParam String keyword){
        ServicePaginationDTO servicePaginationDTO = serviceService.searchService(page, limit, keyword);
        return ResponseEntity.ok(servicePaginationDTO);
    }
    
    //Tìm tất cả các service đang phục vụ (phân trang)
    @GetMapping("/list/still-serving")
    public ResponseEntity<ServicePaginationDTO> listServicePaginationStillServing(@RequestParam int page , @RequestParam int limit, @RequestParam String keyword){
        ServicePaginationDTO servicePaginationDTO = serviceService.searchServiceStillServing(page, limit, keyword);
        return ResponseEntity.ok(servicePaginationDTO);
    }
    
    //Tìm tất cả các service ngưng phục vụ (phân trang)
    @GetMapping("/list/stop-serving")
    public ResponseEntity<ServicePaginationDTO> listServicePaginationStopServing(@RequestParam int page , @RequestParam int limit, @RequestParam String keyword){
        ServicePaginationDTO servicePaginationDTO = serviceService.searchServiceStopServing(page, limit, keyword);
        return ResponseEntity.ok(servicePaginationDTO);
    }
    
    
    // tao service mới
    @PostMapping
    public ResponseEntity<ServiceDTORequest> addService(@Valid @RequestBody ServiceDTORequest serviceDTORequest) throws IOException {
        serviceService.saveService(serviceDTORequest);
        return ResponseEntity.ok(serviceDTORequest);
    }

    // sửa service
    @PutMapping("/{id}")
    public ResponseEntity<ServiceDTOUpdateRequest> updateService(@PathVariable("id") int id, @Valid @RequestBody ServiceDTOUpdateRequest serviceDTOUpdateRequest) throws IOException {
        serviceService.updateService(id, serviceDTOUpdateRequest);
        return ResponseEntity.ok(serviceDTOUpdateRequest);
    }
    
    // chuyển service từ đang phục vụ sang trạng thái ngưng phục vụ
    @PutMapping("/stop-serving/{id}")
    public ResponseEntity<Void> putServiceToStopServing (@PathVariable("id") int id ){
        serviceService.putServiceToStopServing(id);
        return ResponseEntity.ok().build();
    }
    
    // chuyển service từ ngưng phục vụ  sang trạng đang phục vụ
    @PutMapping("/still-serving/{id}")
    public ResponseEntity<Void> putServiceToStillServing (@PathVariable("id") int id ){
        serviceService.putServiceToStillServing(id);
        return ResponseEntity.ok().build();
    }
    
    //xóa service
    @PutMapping("/delete/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable("id") int id){
        serviceService.deleteService(id);
        return ResponseEntity.ok().build();
    }

}

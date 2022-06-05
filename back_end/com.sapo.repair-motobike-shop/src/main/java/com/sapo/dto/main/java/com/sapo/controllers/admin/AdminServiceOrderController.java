package com.sapo.controllers.admin;

import com.sapo.dto.services.ServiceOrderPaginationDTO;
import com.sapo.entities.Invoice;
import com.sapo.entities.Service;
import com.sapo.entities.ServiceOrder;
import com.sapo.services.ServiceOrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/service_orders")
@PreAuthorize("hasRole('ADMIN')")
public class AdminServiceOrderController {
    private final ServiceOrderService serviceOrderService;

    public AdminServiceOrderController(ServiceOrderService serviceOrderService) {
        this.serviceOrderService = serviceOrderService;
    }

    // tim tat ca cac service order va phan trang
    @GetMapping("/list")
    public ResponseEntity<ServiceOrderPaginationDTO> searchServiceOrder(@RequestParam int page, @RequestParam int limit , @RequestParam String keyword){
        ServiceOrderPaginationDTO serviceOrderPaginationDTO = serviceOrderService.searchServiceOrder(page, limit, keyword);
        return ResponseEntity.ok(serviceOrderPaginationDTO);
    }

    // tao serviceOrder
    @PostMapping
    public ResponseEntity<ServiceOrder> addServiceOrder(@Valid @RequestBody ServiceOrder serviceOrder , @Valid @RequestBody Service service , @Valid @RequestBody Invoice invoice) throws IOException {
        serviceOrderService.saveServiceOrder(serviceOrder,service,invoice);
        return ResponseEntity.ok(serviceOrder);
    }
    // tim thong tin service_order bang id
    @GetMapping("/{id}")
    public ResponseEntity<ServiceOrder> findServiceOrderById(@PathVariable("id") int id ){
        ServiceOrder serviceOrder = serviceOrderService.findServiceOrderbyId(id);
        return ResponseEntity.ok(serviceOrder);
    }
    // update ServiceOrder
    @PutMapping("/{id}")
    public ResponseEntity<ServiceOrder> updateServiceOrder(@Valid @RequestBody ServiceOrder serviceOrder) throws IOException {
        serviceOrderService.updateServiceOrder(serviceOrder);
        return ResponseEntity.ok(serviceOrderService.findServiceOrderbyId(serviceOrder.getId()));
    }
    // xoa serviceOrder
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteServiceOrder(@PathVariable("id") int id){
        serviceOrderService.deleteServiceOrder(id);
        return ResponseEntity.ok().build();
    }
}

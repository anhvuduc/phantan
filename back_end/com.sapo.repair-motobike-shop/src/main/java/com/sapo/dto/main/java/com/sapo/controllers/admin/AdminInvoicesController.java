package com.sapo.controllers.admin;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.dto.invoices.*;
import com.sapo.dto.users.UserDTOResponse;
import com.sapo.services.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/invoices")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN')")
public class AdminInvoicesController {
  private final InvoiceService invoiceService;
  
  public AdminInvoicesController(InvoiceService invoiceService) {
    this.invoiceService = invoiceService;
  }
  
  //API lấy list hóa đơn chờ thanh toán và đã thanh toán
  @GetMapping("/list")
  public ResponseEntity<InvoiceMaterialPaginationResponseDTO> listInvoiceInProcess(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword, @RequestParam List<Integer> status){
    int sort = 0;
    InvoiceMaterialPaginationResponseDTO invoiceDTO = invoiceService.findAllInvoiceAndBuyMaterialByStatus(page, limit, keyword, status, sort);
    return ResponseEntity.ok(invoiceDTO);
  }
  
  //API hoàn thành thanh toán hóa đơn
  @PutMapping("/{id}")
  public ResponseEntity<Void> changeStatusInvoiceToCompletePayment (@PathVariable("id") int id, @RequestBody InvoiceAddRequestDTO invoiceAddRequestDTO){
   invoiceService.changeStatusInvoice(id, ConstantVariableCommon.STATUS_INVOICE_5 , invoiceAddRequestDTO);

    return ResponseEntity.ok().build();
  }

  //API hủy hóa đơn 1,2,7
  @PutMapping("/delete/{id}")
  public ResponseEntity<Void> deleteInvoice(@PathVariable("id") int id) {
    invoiceService.deleteInvoice(id);
    return ResponseEntity.ok().build();
  }
  //API tìm invoice và phụ kiện dịch vụ đã kh dc xác nhận theo id
  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
  public ResponseEntity<InvoiceEditResponseDTO> getInvoiceById(@PathVariable("id") int id){
    InvoiceEditResponseDTO invoiceEditResponseDTO = invoiceService.findInvoiceById(id);
    return ResponseEntity.ok(invoiceEditResponseDTO);
  }


}

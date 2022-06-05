package com.sapo.controllers.admin;

import com.sapo.dto.receipts.*;
import com.sapo.entities.Receipt;
import com.sapo.services.ReceiptService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/receipts")
@PreAuthorize("hasRole('ADMIN')")
public class AdminReceiptController {
    private final ReceiptService receiptService;

    public AdminReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    // API Tìm tất cả Receipt và phân trang
    @GetMapping("/list")
    public ResponseEntity<ReceiptPaginationDTO> listReceipt(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword){
        ReceiptPaginationDTO receiptPaginationDTO = receiptService.searchReceipt(page, limit, keyword);
        return ResponseEntity.ok(receiptPaginationDTO);
    }

    // API Tạo Receipt
    @PostMapping
    public ResponseEntity<Void> addReceipt(@RequestBody ReceiptDTORequest receipt)  {
        receiptService.saveReceipt(receipt);
        return ResponseEntity.ok().build();
    }

    //API Tìm Thông tin Receipt bằng id
    @GetMapping("/{id}")
    public ResponseEntity<Receipt> findReceiptById(@PathVariable("id") int id){
        Receipt receipt = receiptService.findReceiptById(id);
        return ResponseEntity.ok(receipt);
    }

    //API đổi trạng thái receipt
    @PutMapping("/{id}/status")
    public ResponseEntity<ReceiptDTOResponse> changeStatusReceipt(@PathVariable int id){
        ReceiptDTOResponse receiptDTOResponse = receiptService.changeStatusReceipt(id);
        return ResponseEntity.ok(receiptDTOResponse);
    }

    // Xóa receipt
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceipt(@PathVariable("id") int id){
        receiptService.deleteReceipt(id);
        return ResponseEntity.ok().build();
    }

    //API Tìm Thông tin Receipt DTO bằng id
    @GetMapping("/detail/{id}")
    public ResponseEntity<ViewReceiptDTOResponse> getReceiptById(@PathVariable("id") int id){
        ViewReceiptDTOResponse receiptDTO = receiptService.findReceiptDetailById(id);
        return ResponseEntity.ok(receiptDTO);
    }

}

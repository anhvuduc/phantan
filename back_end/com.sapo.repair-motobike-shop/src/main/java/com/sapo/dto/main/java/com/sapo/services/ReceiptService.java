package com.sapo.services;

import com.sapo.dto.receipts.*;
import com.sapo.entities.Receipt;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public interface ReceiptService {


    // Hàm lưu receipt
    @Transactional(rollbackOn = Exception.class)
    void saveReceipt(ReceiptDTORequest receipt);

    //Hàm tìm receipt bằng id
    Receipt findReceiptById(int id);

    //Hàm tìm receiptDTO bằng id
    ViewReceiptDTOResponse findReceiptDetailById(int id);
//    //Hàm update receipt
//    @Transactional(rollbackOn = Exception.class)
//    void updateReceipt(int id, ReceiptDTOUpdateRequest ReceiptDTOUpdateRequest);

    //Hàm delete receipt
    ReceiptDTOResponse changeStatusReceipt(int id);

    //Hàm search receipt
    ReceiptPaginationDTO searchReceipt(int page, int limit, String keyword);

    // hàm delete receipt
    void deleteReceipt(int id);
}

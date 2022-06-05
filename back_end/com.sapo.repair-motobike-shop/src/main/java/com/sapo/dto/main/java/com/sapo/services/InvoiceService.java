package com.sapo.services;

import com.sapo.dto.invoices.*;
import com.sapo.entities.Invoice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface InvoiceService {
    //Hàm lấy list hóa đơn trạng thái chờ xử lý và đang xử lý
    InvoiceListPaginationResponseDTO findAllInvoiceByStatus(int page, int limit, String keyword, List<Integer> status, int sort);

    //hàm lấy list hóa đơn trạng thái chờ thanh toán và thanh toán
    InvoiceMaterialPaginationResponseDTO findAllInvoiceAndBuyMaterialByStatus(int page, int limit, String keyword, List<Integer> status, int sort);


    //Hàm lấy list hóa đơn trạng thái đang xử lý
    InvoiceListPaginationResponseDTO findAllInvoiceInProcess(int page, int limit, String keyword);

    //Hàm tạo hóa đơn
    void saveInvoice(InvoiceAddRequestDTO invoiceAddRequestDTO);

    //Hàm chuyển trạng thái , note , paymethod
    void changeStatusInvoice(int id, int status, InvoiceAddRequestDTO invoiceAddRequestDTO);

    //Hàm chuyển trạng thái
    InvoiceResponseDTO changeStatusInvoice(int id);
    //Hàm tìm invoice bằng id
    InvoiceEditResponseDTO findInvoiceById(int id);

    //Hàm tìm invoice bằng id
    InvoiceEditResponseDTO findInvoiceConfirmById(int id);

    //Hàm sửa hóa đơn
    void editInvoice(int id, InvoiceEditRequestDTO invoiceEditRequestDTO);

    //Hàm sửa trạng thái của material-order service-order
    void changeStatusOrderInvoice(int id, boolean agreement);

    //Hàm nhận phiếu sửa chữa của nhân viên sửa chữa
    void getVoteFixer(int userId , int id);

    //Hàm tìm list phiếu sửa chữa không có thợ sửa
    InvoiceListPaginationResponseDTO findAllInvoiceNoFixer(int page, int limit, String keyword);

    
    //Hàm xóa hóa đơn 1,2,7 (sửa status về 6)
    void deleteInvoice (int id);
    
    //Hàm lấy list hóa đơn có thể xóa (status = 1,2,7)
    InvoiceListPaginationResponseDTO findAllInvoiceCanDelete (int page, int limit, String keyword);

    //hàm lấy list phiếu sửa chữa có trạng thái 1,2,3, 7
    List<Invoice> findAllInvoiceByStatusOfStaff();

    //Hàm xác nhận phiếu của nhân viên
    void receiptInvoiceByFixer(int id);

    //Hàm hoàn thành của nhân viên sửa chữa
    void finishInvoiceByFixer(int id);

    //hàm so sánh số lượng còn trong material
    void compareQuantityMaterial(int id, int quantity);

    //Hàm tạo phiếu chỉ để mua hàng
    void saveInvoiceMaterial(InvoiceBuyMaterialRequest invoiceBuyMaterialRequest);

}

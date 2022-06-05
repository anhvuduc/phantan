package com.sapo.services;

import com.sapo.dto.services.*;
import com.sapo.entities.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@org.springframework.stereotype.Service
public interface ServiceService {
    
    //tim service bang id
    Service findServiceById(int id);
    
    //Tìm tất cả các service đang phục vụ
    List<ServiceListInvoiceResponseDTO>  searchListServiceStillServing(String keyword);

    List<ServiceListInvoiceResponseDTO> searchListService(String keyword);
    // search service
    ServicePaginationDTO searchService(int page, int limit, String keyword);
    
    //tìm list service đang phục vụ (phân trang)
    ServicePaginationDTO searchServiceStillServing(int page, int limit, String keyword);
    
    //tìm list service đang phục vụ (phân trang)
    ServicePaginationDTO searchServiceStopServing(int page, int limit, String keyword);
    
    // Tạo service
    @Transactional(rollbackOn = Exception.class)
    void saveService(ServiceDTORequest serviceDTORequest) throws IOException;
    
    // sửa Service
    @Transactional(rollbackOn = Exception.class)
    void updateService(int id, ServiceDTOUpdateRequest serviceDTOUpdateRequest) throws IOException;
    
    // chuyển service từ đanh phục vụ sang trạng thái ngưng phục vụ
    void putServiceToStopServing(int id);
    
    // chuyển service từ ngưng phục vụ sang trạng thái đang phục vụ
    void putServiceToStillServing(int id);
    
    // xoa service
    void deleteService(int id);
    
}

package com.sapo.services;


import com.sapo.dto.services.ServiceOrderPaginationDTO;
import com.sapo.entities.Invoice;
import com.sapo.entities.ServiceOrder;
import com.sapo.entities.Service;

import javax.transaction.Transactional;
import java.io.IOException;

@org.springframework.stereotype.Service
public interface ServiceOrderService {
    //luu service order
    @Transactional(rollbackOn = Exception.class)
    void saveServiceOrder(ServiceOrder serviceOrder, Service service, Invoice invoice) throws IOException;

    // update Service Order
    @Transactional(rollbackOn = Exception.class)
    void updateServiceOrder(ServiceOrder serviceOrder) throws IOException;

    // tim service order bang id
    ServiceOrder findServiceOrderbyId(int id);

    // xoa service order
    void deleteServiceOrder(int id);

    // search ServiceOrder
    ServiceOrderPaginationDTO searchServiceOrder(int page, int limit , String keyword);


}

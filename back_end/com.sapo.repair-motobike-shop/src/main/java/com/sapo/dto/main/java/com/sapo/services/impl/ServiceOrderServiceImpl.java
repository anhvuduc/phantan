package com.sapo.services.impl;

import com.sapo.common.Common;

import com.sapo.dao.jpa.ServiceOrderDAO;

import com.sapo.dto.services.ServiceOrderDTO;
import com.sapo.dto.services.ServiceOrderPaginationDTO;
import com.sapo.dto.common.Pagination;
import com.sapo.entities.Invoice;

import com.sapo.entities.ServiceOrder;
import com.sapo.entities.Service;
import com.sapo.exception.NotFoundException;
import com.sapo.repositories.ServiceOrderRepository;
import com.sapo.services.ServiceOrderService;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceOrderServiceImpl implements ServiceOrderService {
    private final ServiceOrderRepository serviceOrderRepository;
    private final ServiceOrderDAO serviceOrderDAO;

    public ServiceOrderServiceImpl(ServiceOrderRepository serviceOrderRepository, ServiceOrderDAO serviceOrderDAO) {
        this.serviceOrderRepository = serviceOrderRepository;
        this.serviceOrderDAO = serviceOrderDAO;
    }
    // luu serviceOrder bang ServiceOrderRepository
    private void saveServiceOrderRepository(ServiceOrder serviceOrder){
        try{
            serviceOrderRepository.save(serviceOrder);
        }catch(Exception e){
            throw e ;
        }
    }

    // tao mot service order moi
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveServiceOrder(ServiceOrder serviceOrder, Service service , Invoice invoice) throws IOException {
        try{
            serviceOrder.setCode(Common.GenerateCodeServiceOrder());
            serviceOrder.setInvoice(invoice);
            serviceOrder.setServiceId(service.getId());
            serviceOrder.setCreatedAt();
            saveServiceOrderRepository(serviceOrder);
        }catch(Exception e){
            throw e ;
        }
    }

    @Override
    public void updateServiceOrder(ServiceOrder serviceOrder) throws IOException {
        try{
            ServiceOrder serviceOrder1 = serviceOrderDAO.findServiceOrderByID(serviceOrder.getId());
            serviceOrder.setUpdatedAt();
            saveServiceOrderRepository(serviceOrder);
        }catch(Exception e){
            throw  e;
        }

    }
    // tim kiem service order bang id
    @Override
    public ServiceOrder findServiceOrderbyId(int id) {
        ServiceOrder serviceOrder = serviceOrderDAO.findServiceOrderByID(id);
        return serviceOrder;
    }
    // xoa service order
    @Override
    public void deleteServiceOrder(int id) {
        try{
            ServiceOrder serviceOrder = serviceOrderDAO.findServiceOrderByID(id);
            serviceOrder.setDeletedAt();
            saveServiceOrderRepository(serviceOrder);
        }catch(Exception e){
            throw new NotFoundException(e.getMessage());

        }
    }

    // chyyen ServiceOrder sang serviceOrderDTO
    public ServiceOrderPaginationDTO findAllServiceOrderDTO(int page , int limit , List<ServiceOrder> serviceOrders){
        List<ServiceOrderDTO> serviceOrderDTOS = new ArrayList<ServiceOrderDTO>();
        serviceOrders.forEach(serviceOrder -> {
            ServiceOrderDTO serviceOrderDTO = new ServiceOrderDTO(serviceOrder.getCode(),serviceOrder.getServiceId(),serviceOrder.getInvoice().getId());
            serviceOrderDTOS.add(serviceOrderDTO);
        });
        ServiceOrderPaginationDTO serviceOrderPaginationDTO = findAllServiceOrderPaginationDTO(page,limit,serviceOrderDTOS);
        return serviceOrderPaginationDTO;

    }
    private ServiceOrderPaginationDTO findAllServiceOrderPaginationDTO(int page, int limit , List<ServiceOrderDTO> serviceOrderDTOS){
        List<ServiceOrderDTO> serviceOrderDTOList  = new ArrayList<ServiceOrderDTO>();
        if((serviceOrderDTOS.size() - (page * limit - limit)> limit)){
            for(int i = page * limit - limit; i < page * limit; i++){
                serviceOrderDTOList.add(serviceOrderDTOS.get(i));
            }
        }else{
            for(int i = page * limit - limit; i < serviceOrderDTOS.size(); i++){
                serviceOrderDTOList.add(serviceOrderDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page,limit,serviceOrderDTOS.size());
        ServiceOrderPaginationDTO serviceOrderPaginationDTO = new ServiceOrderPaginationDTO(serviceOrderDTOList,pagination);
        return serviceOrderPaginationDTO;
    }

    @Override
    public ServiceOrderPaginationDTO searchServiceOrder(int page, int limit, String keyword) {
        List<ServiceOrder> serviceOrders = serviceOrderDAO.findServiceOrderByKeyWord(keyword);
        ServiceOrderPaginationDTO serviceOrderPaginationDTO = findAllServiceOrderDTO(page,limit,serviceOrders);

        return serviceOrderPaginationDTO;
    }
}

package com.sapo.services.impl;


import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.ServiceDAO;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.customers.CustomerDTORequest;
import com.sapo.dto.customers.CustomerDTOUpdateRequest;
import com.sapo.dto.services.*;
import com.sapo.entities.Customer;
import com.sapo.entities.Service;
import com.sapo.entities.User;
import com.sapo.repositories.ServiceRepository;
import com.sapo.services.ServiceService;
import com.sapo.validate.InputValidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {
  private final ServiceRepository serviceRepository;
  private final ServiceDAO serviceDAO;
  
  private static final Logger LOGGER = LoggerFactory.getLogger(ServiceServiceImpl.class.toString());
  
  public ServiceServiceImpl(ServiceRepository serviceRepository, ServiceDAO serviceDAO) {
    this.serviceRepository = serviceRepository;
    this.serviceDAO = serviceDAO;
  }
  
  //Hàm tìm service bằng id
  @Override
  public Service findServiceById(int id){
    Service service = serviceDAO.findServiceById(id);
    return service;
  }
  
  //Hàm tìm list service đang phục vụ (phân trang)
  public ServicePaginationDTO searchServiceStillServing(int page, int limit, String keyword) {
    List<Service> services = serviceDAO.findServiceStillServingByKeyWord(keyword);
    ServicePaginationDTO servicePaginationDTO = findAllServiceDTO(page, limit, services);
    return servicePaginationDTO;
  }
  
  //Hàm tìm list service đang phục vụ (phân trang)
  public ServicePaginationDTO searchServiceStopServing(int page, int limit, String keyword) {
    List<Service> services = serviceDAO.findServiceStopServingByKeyWord(keyword);
    ServicePaginationDTO servicePaginationDTO = findAllServiceDTO(page, limit, services);
    return servicePaginationDTO;
  }
  
  //Tìm tất cả các service đang phục vụ
  @Override
  public List<ServiceListInvoiceResponseDTO> searchListServiceStillServing(String keyword){
    List<Service> services = serviceDAO.searchListServiceStillServing(keyword);
    List<ServiceListInvoiceResponseDTO> serviceDTOResponses = transferServiceToServiceDTOS(services);
    return serviceDTOResponses;
  }

  // Chuyển service sang serviceDTO
  private List<ServiceListInvoiceResponseDTO> transferServiceToServiceDTOS(List<Service> services){
    List<ServiceListInvoiceResponseDTO> serviceDTOS = new ArrayList<>();
    services.forEach(service -> {
      ServiceListInvoiceResponseDTO serviceDTO = new ServiceListInvoiceResponseDTO(service.getId(), service.getCode(), service.getName() , service.getDescription(), service.getPrice(), ConstantVariableCommon.statusServiceIntToString(service.getStatus()));
      serviceDTOS.add(serviceDTO);
    });
    return serviceDTOS;
  }

  @Override
  public List<ServiceListInvoiceResponseDTO> searchListService(String keyword){
    List<Service> services = serviceDAO.searchListServiceStillServing(keyword);
    List<ServiceListInvoiceResponseDTO> serviceDTOResponses = transferServiceToServiceDTOList(services);
    return serviceDTOResponses;
  }
  // Chuyển service sang serviceDTO
  private List<ServiceListInvoiceResponseDTO> transferServiceToServiceDTOList(List<Service> services){
    List<ServiceListInvoiceResponseDTO> serviceDTOS = new ArrayList<>();
    services.forEach(service -> {
      ServiceListInvoiceResponseDTO serviceDTO = new ServiceListInvoiceResponseDTO(service.getId(), service.getCode(), service.getName() , service.getDescription(), service.getPrice(), ConstantVariableCommon.statusServiceIntToString(service.getStatus()));
      serviceDTOS.add(serviceDTO);
    });
    return serviceDTOS;
  }
  //Hàm search service
  @Override
  public ServicePaginationDTO searchService(int page, int limit, String keyword){
    List<Service> services = serviceDAO.findServiceByKeyWord(keyword);
    ServicePaginationDTO servicePaginationDTO = findAllServiceDTO(page, limit, services);
    return servicePaginationDTO;
  }
  
  // Chuyển service sang serviceDTO
  private ServicePaginationDTO findAllServiceDTO(int page, int limit, List<Service> services){
    List<ServiceDTOResponse> serviceDTOS = transferServiceToServiceDTO(services);
    ServicePaginationDTO servicePaginationDTO = findAllServicePaginationDTO(page,  limit, serviceDTOS);
    return servicePaginationDTO;
  }
  
  // Chuyển service sang serviceDTO
  private List<ServiceDTOResponse> transferServiceToServiceDTO(List<Service> services){
    List<ServiceDTOResponse> serviceDTOS = new ArrayList<>();
    services.forEach(service -> {
      ServiceDTOResponse serviceDTO = new ServiceDTOResponse(service.getId(), service.getCode(), service.getName() , service.getDescription(), Common.getStringPriceVNBigDecimal(service.getPrice()), ConstantVariableCommon.statusServiceIntToString(service.getStatus()));
      serviceDTOS.add(serviceDTO);
    });
    return serviceDTOS;
  }
  
  private ServicePaginationDTO findAllServicePaginationDTO (int page, int limit, List<ServiceDTOResponse> serviceDTOS){
    List<ServiceDTOResponse> serviceDTOList = new ArrayList<ServiceDTOResponse>();
    if ((serviceDTOS.size() - (page * limit - limit)) > limit) {
      for (int i = page * limit - limit; i < page * limit; i++) {
        serviceDTOList.add(serviceDTOS.get(i));
      }
    } else {
      for (int i = page * limit - limit; i < serviceDTOS.size(); i++) {
        serviceDTOList.add(serviceDTOS.get(i));
      }
    }
    Pagination pagination = new Pagination(page, limit, serviceDTOS.size());
    ServicePaginationDTO servicePaginationDTO = new ServicePaginationDTO(serviceDTOList, pagination);
    return servicePaginationDTO;
  }
  
  // tạo service mới
  @Override
  @Transactional(rollbackOn = Exception.class)
  public void saveService(ServiceDTORequest serviceDTO){
    Service service = new Service();
    List<Service> services = serviceDAO.findAllServiceExist();
    InputValidate.validateServiceName(serviceDTO.getName(), services);
  
    service.setCode(Common.GenerateCodeService());
    service.setName(serviceDTO.getName());
    service.setDescription(serviceDTO.getDescription());
    service.setPrice(serviceDTO.getPrice());
    service.setStatus(ConstantVariableCommon.STATUS_SERVICE_1);
    service.setCreatedAt();
    saveServiceRepository(service);
  }
  
  //Hàm lưu service bằng ServiceRepository
  private void saveServiceRepository(Service service){
    try{
      serviceRepository.save(service);
    }catch (Exception e){
      LOGGER.error("ERROR: {} | Save service", service);
    }
  }
  
  // sửa Service
  @Override
  @Transactional(rollbackOn = Exception.class)
  public void updateService(int id, ServiceDTOUpdateRequest serviceDTOUpdateRequest) {
    Service service = findServiceById(id);
    
    if(serviceDTOUpdateRequest.getName() != null){
      service.setName(serviceDTOUpdateRequest.getName());
    }
    if(serviceDTOUpdateRequest.getDescription() != null){
      service.setDescription(serviceDTOUpdateRequest.getDescription());
    }
    if(serviceDTOUpdateRequest.getPrice() != null){
      service.setPrice(serviceDTOUpdateRequest.getPrice());
    }
    
    service.setUpdatedAt();
    saveServiceRepository(service);
  }
  
  @Override
  public void putServiceToStopServing(int id){
    Service service = findServiceById(id);
    if (service.getStatus() == ConstantVariableCommon.STATUS_SERVICE_1) {
      service.setStatus(ConstantVariableCommon.STATUS_SERVICE_2);
      service.setUpdatedAt();
      saveServiceRepository(service);
    }
  }
  
  @Override
  public void putServiceToStillServing(int id){
    Service service = findServiceById(id);
    if (service.getStatus() == ConstantVariableCommon.STATUS_SERVICE_2) {
      service.setStatus(ConstantVariableCommon.STATUS_SERVICE_1);
      service.setUpdatedAt();
      saveServiceRepository(service);
    }
  }
  //Hàm xóa user
  @Override
  public void deleteService(int id){
    Service service = findServiceById(id);
    if (service.getStatus() != ConstantVariableCommon.STATUS_SERVICE_3) {
      service.setStatus(ConstantVariableCommon.STATUS_SERVICE_3);
      service.setDeletedAt();
      saveServiceRepository(service);
    }
  }
}

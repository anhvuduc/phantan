package com.sapo.dto.services;


import com.sapo.dto.common.Pagination;
import com.sapo.dto.materials.MaterialDTOResponse;

import java.util.List;

public class ServicePaginationDTO {
    private List<ServiceDTOResponse> serviceDTOS;
    private Pagination pagination;
    
    public ServicePaginationDTO(List<ServiceDTOResponse> serviceDTOS, Pagination pagination) {
        this.serviceDTOS = serviceDTOS;
        this.pagination = pagination;
    }
    
    public ServicePaginationDTO() {
    }
    
    public List<ServiceDTOResponse> getServiceDTOS() {
        return serviceDTOS;
    }
    
    public void setServiceDTOS(List<ServiceDTOResponse> serviceDTOS) {
        this.serviceDTOS = serviceDTOS;
    }
    
    public Pagination getPagination() {
        return pagination;
    }
    
    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}

package com.sapo.dto.services;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class ServiceOrderPaginationDTO {
    List<ServiceOrderDTO> serviceOrderDTOS;
    private Pagination pagination;

    public ServiceOrderPaginationDTO(List<ServiceOrderDTO> serviceOrderDTOS, Pagination pagination) {
        this.serviceOrderDTOS = serviceOrderDTOS;
        this.pagination = pagination;
    }

    public ServiceOrderPaginationDTO() {
    }

    public List<ServiceOrderDTO> getServiceOrderDTOS() {
        return serviceOrderDTOS;
    }

    public void setServiceOrderDTOS(List<ServiceOrderDTO> serviceOrderDTOS) {
        this.serviceOrderDTOS = serviceOrderDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}

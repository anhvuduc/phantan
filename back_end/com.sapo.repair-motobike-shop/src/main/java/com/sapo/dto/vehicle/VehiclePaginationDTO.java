package com.sapo.dto.vehicle;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class VehiclePaginationDTO {
  private List<VehicleDTOResponse> vehicleDTOResponses;
  private Pagination pagination;
  
  public VehiclePaginationDTO(List<VehicleDTOResponse> vehicleDTOResponses, Pagination pagination) {
    this.vehicleDTOResponses = vehicleDTOResponses;
    this.pagination = pagination;
  }
  
  public VehiclePaginationDTO() {
  }
  
  public List<VehicleDTOResponse> getVehicleDTOResponses() {
    return vehicleDTOResponses;
  }
  
  public void setVehicleDTOResponses(List<VehicleDTOResponse> vehicleDTOResponses) {
    this.vehicleDTOResponses = vehicleDTOResponses;
  }
  
  public Pagination getPagination() {
    return pagination;
  }
  
  public void setPagination(Pagination pagination) {
    this.pagination = pagination;
  }
}

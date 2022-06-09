package com.sapo.dto.materials;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class MaterialPaginationDTO {
    private List<MaterialDTOResponse> materialDTOS;
    private Pagination pagination;

    public MaterialPaginationDTO(List<MaterialDTOResponse> materialDTOS, Pagination pagination) {
        this.materialDTOS = materialDTOS;
        this.pagination = pagination;
    }

    public MaterialPaginationDTO() {
    }

    public List<MaterialDTOResponse> getMaterialDTOS() {
        return materialDTOS;
    }

    public void setMaterialDTOS(List<MaterialDTOResponse> materialDTOS) {
        this.materialDTOS = materialDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}

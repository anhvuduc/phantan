package com.sapo.dto.role;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class RolePaginationDTOResponse {
    private List<RolesResponseDTO> rolesResponseDTOS;
    private Pagination pagination;

    public RolePaginationDTOResponse(List<RolesResponseDTO> rolesResponseDTOS, Pagination pagination) {
        this.rolesResponseDTOS = rolesResponseDTOS;
        this.pagination = pagination;
    }

    public List<RolesResponseDTO> getRolesResponseDTOS() {
        return rolesResponseDTOS;
    }

    public void setRolesResponseDTOS(List<RolesResponseDTO> rolesResponseDTOS) {
        this.rolesResponseDTOS = rolesResponseDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}

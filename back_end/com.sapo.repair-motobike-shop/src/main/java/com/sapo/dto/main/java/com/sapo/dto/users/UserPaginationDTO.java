package com.sapo.dto.users;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class UserPaginationDTO {
    private List<UserDTOResponse> userDTOS;
    private Pagination pagination;

    public UserPaginationDTO(List<UserDTOResponse> userDTOS, Pagination pagination) {
        this.userDTOS = userDTOS;
        this.pagination = pagination;
    }

    public UserPaginationDTO() {

    }

    public List<UserDTOResponse> getUserDTOS() {
        return userDTOS;
    }

    public void setUserDTOS(List<UserDTOResponse> userDTOS) {
        this.userDTOS = userDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}

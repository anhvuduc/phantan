package com.sapo.dto.timesheets;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class UserTimeSheetDTOPaginationResponse {
    private List<UserTimeSheetDTOResponse> userTimeSheetDTOResponseList;
    private Pagination pagination;

    public UserTimeSheetDTOPaginationResponse(List<UserTimeSheetDTOResponse> userTimeSheetDTOResponseList, Pagination pagination) {
        this.userTimeSheetDTOResponseList = userTimeSheetDTOResponseList;
        this.pagination = pagination;
    }

    public List<UserTimeSheetDTOResponse> getUserTimeSheetDTOResponseList() {
        return userTimeSheetDTOResponseList;
    }

    public void setUserTimeSheetDTOResponseList(List<UserTimeSheetDTOResponse> userTimeSheetDTOResponseList) {
        this.userTimeSheetDTOResponseList = userTimeSheetDTOResponseList;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}

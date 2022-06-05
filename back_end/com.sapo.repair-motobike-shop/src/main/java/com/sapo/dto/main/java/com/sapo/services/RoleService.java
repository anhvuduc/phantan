package com.sapo.services;

import com.sapo.dto.role.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    //Hàm tìm role đang sử dụng
    List<RoleDTOListResponse> listRoleUsing();

    //Hàm lưu role
    void saveRole(RoleDTORequest roleDTORequest);

    //Hàm lấy list và tìm kiếm chức vụ bằng keyword
    RolePaginationDTOResponse searchRole(int page, int limit, String keyword);
    
    //Hàm tìm role bằng id
    RoleDTOResponse getRoleById(int id);

    //Hàm sửa role
    void editRole(RoleDTOResponse roleDTOResponse, int id);
}

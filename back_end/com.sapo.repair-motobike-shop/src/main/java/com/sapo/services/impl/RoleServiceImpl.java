package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.RoleDao;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.role.*;
import com.sapo.entities.Role;
import com.sapo.repositories.RoleRepository;
import com.sapo.services.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleDao roleDao;
    private final RoleRepository roleRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());
    
    public RoleServiceImpl(RoleDao roleDao, RoleRepository roleRepository) {
        this.roleDao = roleDao;
        this.roleRepository = roleRepository;
    }
    
    //Hàm lấy list role đang sử dụng
    @Override
    public List<RoleDTOListResponse> listRoleUsing(){
        List<Role> roles = roleDao.findAllRoleByStatus();
        List<RoleDTOListResponse> roleDTOListResponses = new ArrayList<>();
        for (Role role : roles){
            RoleDTOListResponse roleDTOListResponse = new RoleDTOListResponse(role.getId(), role.getCode(), role.getName(), role.getDescription(), role.getStatus());
            roleDTOListResponses.add(roleDTOListResponse);
        }
        return roleDTOListResponses;
    }

    //hàm set role và lưu role
    @Override
    public void saveRole(RoleDTORequest roleDTORequest){
        Role role = new Role();
        role.setName(roleDTORequest.getRoleName());
        role.setDescription(roleDTORequest.getRoleDescription());
        role.setCode(Common.GenerateCodeRole());
        role.setCreatedAt();
        role.setStatus(ConstantVariableCommon.STATUS_ROLE_1);

        saveRole(role);
    }

    //Hàm lưu role repository
    @Transactional(rollbackOn = Exception.class)
    void saveRole(Role role){
        try{
            roleRepository.save(role);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Lỗi lưu role repository");
        }
    }

    //hàm lấy list chức vụ có keyword
    @Override
    public RolePaginationDTOResponse searchRole(int page, int limit, String keyword){
        List<Role> roles = roleDao.listUser(keyword);
        RolePaginationDTOResponse rolePaginationDTO = findAllRoleDTO(page, limit, roles);

        return rolePaginationDTO;
    }
    //Hàm chuyển từ Role -> RoleDTO và phân trang
    private RolePaginationDTOResponse findAllRoleDTO(int page, int limit, List<Role> roles){
        List<RolesResponseDTO> rolesResponseDTOS = transferRoletoRoleDTO(roles);
        RolePaginationDTOResponse rolePaginationDTOResponse = findAllRolePaginationDTO(page,  limit, rolesResponseDTOS);
        return rolePaginationDTOResponse;
    }
    //Hàm chuyển từ Role -> RoleDTO và phân trang
    private List<RolesResponseDTO> transferRoletoRoleDTO(List<Role> roles){
        List<RolesResponseDTO> rolesResponseDTOS = new ArrayList<>();
        for (Role role: roles){
            RolesResponseDTO rolesResponseDTO = new RolesResponseDTO(role.getId(), role.getCode(), role.getName(), role.getDescription(), ConstantVariableCommon.statusRoleIntToString(role.getStatus()));
            rolesResponseDTOS.add(rolesResponseDTO);
        }
        return rolesResponseDTOS;
    }

    //hàm phân trang
    private RolePaginationDTOResponse findAllRolePaginationDTO(int page, int limit, List<RolesResponseDTO> roleDTOS){
        List<RolesResponseDTO> roleDTOList = new ArrayList<>();
        if ((roleDTOS.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                roleDTOList.add(roleDTOS.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < roleDTOS.size(); i++) {
                roleDTOList.add(roleDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, roleDTOS.size());
        RolePaginationDTOResponse rolePaginationDTO = new RolePaginationDTOResponse(roleDTOList, pagination);
        return rolePaginationDTO;
    }



    
    //Hàm tìm roleDTO bằng id
    @Override
    public RoleDTOResponse getRoleById(int id){
        Role role = roleDao.findRoleById(id);
        RoleDTOResponse roleDTOResponse = new RoleDTOResponse(role.getId(), role.getName(), role.getDescription());
        return roleDTOResponse;
    }

    //Hàm sửa role
    @Override
    public void editRole(RoleDTOResponse roleDTOResponse, int id){
        Role role = roleDao.findRoleById(id);
        role.setDescription(roleDTOResponse.getDescription());
        role.setName(roleDTOResponse.getName());
        role.setUpdatedAt();
        saveRole(role);
    }
}

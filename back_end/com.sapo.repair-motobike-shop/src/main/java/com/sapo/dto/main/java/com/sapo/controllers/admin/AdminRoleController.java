package com.sapo.controllers.admin;

import com.sapo.dto.role.*;
import com.sapo.services.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/admin/roles")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN')")
public class AdminRoleController {
    private final RoleService roleService;

    public AdminRoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    //API lấy list role đang sử dụng
    @GetMapping("/status")
    public ResponseEntity<List<RoleDTOListResponse>> listRoleUsing(){
        List<RoleDTOListResponse> roleDTOListResponses = roleService.listRoleUsing();
        return ResponseEntity.ok(roleDTOListResponses);
    }

    //API tạo role mới
    @PostMapping
    public ResponseEntity<Void> listRoleUsing(@Valid  @RequestBody RoleDTORequest roleDTORequest){
        System.out.println("ROle: " + roleDTORequest.getRoleName() +" "+ roleDTORequest.getRoleDescription());
        roleService.saveRole(roleDTORequest);
        return ResponseEntity.ok().build();
    }

    //API list chức vụ
    @GetMapping("/list")
    public ResponseEntity<RolePaginationDTOResponse> listRole(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword){
        RolePaginationDTOResponse rolePaginationDTOResponse = roleService.searchRole(page, limit, keyword);
        return ResponseEntity.ok(rolePaginationDTOResponse);
    }

    //Api lấy role DTO bằng id
    @GetMapping("/{id}")
    public ResponseEntity<RoleDTOResponse> getRoleById(@PathVariable("id") int id ){
        RoleDTOResponse roleDTOResponse = roleService.getRoleById(id);
        return ResponseEntity.ok(roleDTOResponse);
    }
    //APi sửa role
    @PutMapping("/{id}")
    public ResponseEntity<Void> editRole(@PathVariable("id") int id ,@RequestBody RoleDTOResponse roleDTOResponse){
        roleService.editRole(roleDTOResponse, id);
        return ResponseEntity.ok().build();
    }

    
}

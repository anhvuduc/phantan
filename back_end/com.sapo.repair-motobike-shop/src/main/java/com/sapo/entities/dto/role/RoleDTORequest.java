package com.sapo.dto.role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class RoleDTORequest {

    @NotNull(message = "Tên Chức vụ  không để trống")
    @NotBlank(message = "Tên Chức vụ không để trống")
    private String roleName;

    @NotNull(message = "Mô tả không để trống")
    @NotBlank(message = "Mô tả không để trống")
    private String roleDescription;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }
}

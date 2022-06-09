package com.sapo.dto.users;

import com.sapo.dto.role.RoleDTOListResponse;
import com.sapo.entities.Role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class UserDTORequest{

    @NotNull(message = "Tên đăng nhập không được để trống")
    @NotBlank(message = "Tên đăng nhập không được để trống")
    private String username;

    @NotNull(message = "Mật khẩu không được để trống")
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

    @NotNull(message = "Tên không được để trống")
    @NotBlank(message = "Tên không được để trống")
    private String name;

    private String address;

    private String email;

    @NotNull(message = "Số điện thoại không được để trống")
    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")
    private String phone;

    @NotNull(message = "Vui lòng chọn giới tính")
    private boolean sex;

    @NotNull(message = "Role được để trống")
    private List<Integer> roleId;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean getSex() {
        return sex;
    }

    public void setSex(boolean sex) {
        this.sex = sex;
    }

    public List<Integer> getRoleId() {
        return roleId;
    }

    public void setRoleId(List<Integer> roleId) {
        this.roleId = roleId;
    }
}

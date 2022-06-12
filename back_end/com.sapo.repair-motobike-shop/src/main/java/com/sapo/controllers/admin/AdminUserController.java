package com.sapo.controllers.admin;

import com.sapo.dto.users.*;
import com.sapo.entities.User;
import com.sapo.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {
    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    // API Tìm tất cả User và phân trang
    @GetMapping("/list")
    public ResponseEntity<UserPaginationDTO> listUser(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword, @RequestParam int status, @RequestParam List<Integer> roleIds, HttpServletRequest request){
        System.out.println("Authorization: " + request.getHeader("Authorization"));;
        UserPaginationDTO user = userService.searchUser(page, limit, keyword, status, roleIds);
        return ResponseEntity.ok(user);
    }

    // API Tạo User
    @PostMapping
    public ResponseEntity<UserDTORequest> addUser(@Valid @RequestBody UserDTORequest user) throws IOException {
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    //API Tìm Thông tin user bằng id
    @GetMapping("/{id}")
    public ResponseEntity<UserDTOResponseById> findUserById(@PathVariable("id") int id){
        UserDTOResponseById userById = userService.findUserDTOById(id);
        return ResponseEntity.ok(userById);
    }

    // API sửa User
    @PutMapping("/{id}")
    public ResponseEntity<UserDTOUpdateRequest> updateUser(@PathVariable int id, @Valid @RequestBody UserDTOUpdateRequest userDTOUpdateRequest) {
        userService.updateUser(id, userDTOUpdateRequest);
        return ResponseEntity.ok(userDTOUpdateRequest);
    }

    //API đổi trạng thái user
    @PutMapping("/{id}/status")
    public ResponseEntity<UserDTOResponse> changeStatusUser(@PathVariable int id){
        UserDTOResponse userDTOResponse = userService.changeStatusUser(id);
        return ResponseEntity.ok(userDTOResponse);
    }

    // Xóa user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id){
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    //Hàm điều chỉnh lương
    @PutMapping(value = "/{id}/salary_day")
    public ResponseEntity<Void> changeSalary(@PathVariable("id") int id, @RequestParam double salary){
        userService.changeSalary( id, salary);
        return ResponseEntity.ok().build();
    }

    //Tạo bảng công tháng mới cho nhân viên
    @PostMapping(value = "/timesheets")
    public ResponseEntity<Void> createTimesheets(@RequestBody UserTimeSheetsRequestDTO userTimeSheetsRequestDTO){
        userService.saveTimeSheet(userTimeSheetsRequestDTO.getIds(), userTimeSheetsRequestDTO.getMonth());
        return ResponseEntity.ok().build();
    }
}

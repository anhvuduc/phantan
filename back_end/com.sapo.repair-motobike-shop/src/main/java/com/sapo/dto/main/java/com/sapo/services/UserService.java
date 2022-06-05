package com.sapo.services;

import com.sapo.dto.users.*;
import com.sapo.entities.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public interface UserService {

    // Hàm lưu user
    @Transactional(rollbackOn = Exception.class)
    void saveUser(UserDTORequest userDTO) throws IOException;

    @Transactional(rollbackOn = Exception.class)
    void saveAvatar(int id,MultipartFile avatar) throws IOException;

    //Hàm tìm user DTO bằng id
    UserDTOResponseById findUserDTOById(int id);

    //Hàm tìm user bằng id
     User findUserById(int id);

    //Hàm update user
    @Transactional(rollbackOn = Exception.class)
    void updateUser(int id, UserDTOUpdateRequest userDTOUpdateRequest);

    //Hàm delete User
    UserDTOResponse changeStatusUser(int id);

    //Hàm search User
    UserPaginationDTO searchUser(int page, int limit, String keyword,int status, List<Integer> roleIds);
    
    //Hàm tìm thợ sửa đang rảnh
    List<User> findAllUserReadyFix(String keyword);

    // hàm delete User
    void deleteUser(int id);

    //Hàm điều chỉnh lương
    void changeSalary(int id, double salaryDay);

    //Hàm tạo bảng công cho nhân viên
    void saveTimeSheet(List<Integer> ids, int month);
    
    //Hàm lất list user
    List<User> findAllListUser();

    //Hàm tìm user bằng username
    User findUserByUsername(String username);
}

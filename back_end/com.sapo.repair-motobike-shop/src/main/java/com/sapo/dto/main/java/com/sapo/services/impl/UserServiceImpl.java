package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.RoleDao;
import com.sapo.dao.jpa.UserDAO;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.customers.CustomerDTOResponse;
import com.sapo.dto.role.RoleDTOListResponse;
import com.sapo.dto.users.*;
import com.sapo.entities.Customer;
import com.sapo.entities.Role;
import com.sapo.entities.Timesheet;
import com.sapo.entities.User;
import com.sapo.exception.InputException;
import com.sapo.repositories.TimesheetRepository;
import com.sapo.repositories.UserRepository;
import com.sapo.services.UserService;
import com.sapo.validate.InputValidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserDAO userDAO;
    private final TimesheetRepository timesheetRepository;
    private final RoleDao roleDao;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());


    public UserServiceImpl(UserRepository userRepository, UserDAO userDAO, TimesheetRepository timesheetRepository, RoleDao roleDao) {
        this.userRepository = userRepository;
        this.userDAO = userDAO;
        this.timesheetRepository = timesheetRepository;
        this.roleDao = roleDao;
    }

    //Hàm tìm user bằng id
    @Override
    public UserDTOResponseById findUserDTOById(int id){
        User user = userDAO.findUserById(id);
        UserDTOResponseById userDTOResponseById = new UserDTOResponseById(user.getId(), user.getCode(), user.getUsername(),user.getName(), user.getAddress(),user.getEmail(),user.getPhone(),Common.getStringPriceVN(user.getSalaryDay()),user.getStatus(),Common.getDateByMilliSeconds(user.getCreatedAt()));
        return userDTOResponseById;
    }
    @Override
    public User findUserById(int id){
        User user = userDAO.findUserById(id);
       return user;
    }
    
    //HÀm tìm user theo trạng thái
    @Override
    public List<User> findAllUserReadyFix(String  keyword){
        List<User> users = userDAO.findAllUserReadyFix(ConstantVariableCommon.STATUS_USER_4, keyword);
        return users;
    }

    //Hàm search User
    @Override
    public UserPaginationDTO searchUser(int page, int limit, String keyword, int status, List<Integer> roleIds){
        UserPaginationDTO UserDTOsPagination = new UserPaginationDTO();
            List<User> users = userDAO.findUserByKeyword(keyword, status, roleIds);
            UserDTOsPagination = findAllUserDTO(page, limit, users);
        return UserDTOsPagination;
    }


    // tạo user mới
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveUser(UserDTORequest userDTO){
        User user = new User();
        InputValidate.validatePhone(userDTO.getPhone());
        InputValidate.validateEmail(userDTO.getEmail());
        InputValidate.validateUsername(userDTO.getUsername(), userDAO.findAllUserExist());
        user.setCode(Common.GenerateCodeStaff());
        List<Role> roles = new ArrayList<>();
        for (int i =0; i<userDTO.getRoleId().size() ; i++ ){
            Role role = roleDao.findRoleById(userDTO.getRoleId().get(i));
            roles.add(role);
        }
        user.setRoles(roles);
        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setName(userDTO.getName());
        user.setPassword(Common.GeneratePassword(userDTO.getPassword()));
        user.setPassword(userDTO.getPassword());
        user.setUsername(userDTO.getUsername());
        user.setAddress(userDTO.getAddress());
        user.setSex(userDTO.getSex());
        user.setStatus(ConstantVariableCommon.STATUS_USER_1);
        user.setCreatedAt();
        saveUserRepository(user);
    }

    // Hàm lưu avatar
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveAvatar(int id,MultipartFile avatar) throws IOException {
        User user = userDAO.findUserById(id);
        if (!isEmptyUploadFile(avatar)){
            new File(Common.getNameAddress()+"/upload/avatars/"
                    + user.getAvatar()).delete();
            avatar.transferTo(
                    new File(Common.getNameAddress()+"/upload/avatars/"
                            + avatar.getOriginalFilename()));
        }else {
            user.setAvatar(user.getAvatar());
        }
        user.setAvatar(avatar.getOriginalFilename());
        user.setUpdatedAt();
        saveUserRepository(user);
    }

    // cập nhật user
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateUser(int id, UserDTOUpdateRequest userDTOUpdateRequest) {
        User user = findUserById(id);
        InputValidate.validatePhone(userDTOUpdateRequest.getPhone());
        InputValidate.validateEmail(userDTOUpdateRequest.getEmail());
        if(userDTOUpdateRequest.getName() != null){
            user.setName(userDTOUpdateRequest.getName());
        }
        if(userDTOUpdateRequest.getAddress() != null){
            user.setAddress(userDTOUpdateRequest.getAddress());
        }
        if(userDTOUpdateRequest.getPhone()!= null){
            user.setPhone(userDTOUpdateRequest.getPhone());
        }
        if(userDTOUpdateRequest.getEmail() != null){
            user.setEmail(userDTOUpdateRequest.getEmail());
        }
        user.setStatus(userDTOUpdateRequest.getStatus());
        user.setUpdatedAt();
        saveUserRepository(user);
    }

    //Hàm chuyển trạng thái
    @Override
    public UserDTOResponse changeStatusUser(int id){
            User user = userDAO.findUserById(id);
            if(user.getStatus() == 1){
                user.setStatus(ConstantVariableCommon.STATUS_USER_2);
            }else {
                user.setStatus(ConstantVariableCommon.STATUS_USER_1);
            }
            saveUserRepository(user);
            UserDTOResponse userDTOResponse = new UserDTOResponse(user.getId(), user.getCode(), user.getName(),user.getPhone(), ConstantVariableCommon.statusUserIntToString(user.getStatus()));
            return userDTOResponse;
    }
    //Hàm xóa user
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteUser(int id){
        User user = userDAO.findUserById(id);
        user.setStatus(ConstantVariableCommon.STATUS_USER_2);
        user.setDeletedAt();
        userRepository.save(user);
    }

    @Override
    public void changeSalary(int id, double salaryDay){
        User user = userDAO.findUserById(id);
        user.setSalaryDay(salaryDay);
        userRepository.save(user);
    }

    //Hàm tạo bảng công
    @Override
    public void saveTimeSheet(List<Integer> ids, int month){
        List<Timesheet> timesheets = new ArrayList<>();

        for (int i = 0; i< ids.size() ; i++){
            User user = findUserById(ids.get(i));
            Timesheet timesheet = new Timesheet();
            timesheet.setUser(user);
            timesheet.setCode(Common.GenerateCodeTimeSheet());
            timesheet.setNumberShiftsWork(0);
            timesheet.setNumberShiftsLateWork(0);
            timesheet.setCreatedAt();
            timesheet.setMonth(month);
            timesheet.setStatus(ConstantVariableCommon.STATUS_TIMESHEET_1);

            //Nếu trùng thì sẽ không lưu vào timesheets
            if(InputValidate.checkMonthAndUser(timesheet, timesheetRepository.findAll()) == false) {
                timesheets.add(timesheet);
            }
        }
        if (timesheets.size() == 0){
            throw new InputException("Công của các tháng đã tạo");
        }
        try{
            timesheetRepository.saveAll(timesheets);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Lỗi không lưu được bảng công vào database", e.getMessage());
        }

    }

    // Chuyển user sang UserDTO
    private List<UserDTOResponse> transferUserToUserDTO(List<User> users){
        List<UserDTOResponse> userDTOS = new ArrayList<>();
        users.forEach(user -> {
            UserDTOResponse userDTO = new UserDTOResponse(user.getId(), user.getCode(),user.getName(), user.getPhone(), ConstantVariableCommon.statusUserIntToString(user.getStatus()));
            userDTOS.add(userDTO);
        });
        return userDTOS;
    }

    // Chuyển User sang UserDTO
    private UserPaginationDTO findAllUserDTO(int page, int limit, List<User> users){
        List<UserDTOResponse> userDTOS = transferUserToUserDTO(users);
        UserPaginationDTO userDTOsPagination = findAllUserPaginationDTO(page,  limit, userDTOS);
        return userDTOsPagination;
    }

    //Hàm phân trang
    private UserPaginationDTO findAllUserPaginationDTO (int page, int limit, List<UserDTOResponse> userDTOS){
        List<UserDTOResponse> userDTOList = new ArrayList<UserDTOResponse>();
        if ((userDTOS.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                userDTOList.add(userDTOS.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < userDTOS.size(); i++) {
                userDTOList.add(userDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, userDTOS.size());
        UserPaginationDTO userPaginationDTO = new UserPaginationDTO(userDTOList, pagination);
        return userPaginationDTO;
    }



    //Hàm lưu user bằng UserRepository
    private void saveUserRepository(User user){
        try{
            userRepository.save(user);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Save user", user);
        }
    }

    //Hàm kiểm tra input avatar
    private boolean isEmptyUploadFile(MultipartFile path) {
        if (path == null || path.isEmpty() == true)
            return true;
        return false;
    }
    
    //Hàm lấy list user bằng repository
    @Override
    public List<User> findAllListUser(){
        List<User> users = userRepository.findAll();
        return users;
    }

    //Hàm tìm user bằng username
    @Override
    public User findUserByUsername(String username){
        User user = userDAO.findUserByUsername(username);
        return user;
    }
}

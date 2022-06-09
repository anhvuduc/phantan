package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.TimeSheetDAO;
import com.sapo.dao.jpa.UserDAO;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.timesheets.*;
import com.sapo.entities.Timesheet;
import com.sapo.entities.User;
import com.sapo.repositories.TimesheetRepository;
import com.sapo.services.TimeSheetService;

import com.sapo.services.impl.Excel.ExportFileExcel;
import com.sapo.validate.TimeSheetValidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@Service
public class TimeSheetImpl implements TimeSheetService {
    private final TimesheetRepository timesheetRepository;
    private final TimeSheetDAO timeSheetDAO;
    private final UserDAO userDAO;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());

    public TimeSheetImpl(TimesheetRepository timesheetRepository, TimeSheetDAO timeSheetDAO, UserDAO userDAO) {
        this.timesheetRepository = timesheetRepository;
        this.timeSheetDAO = timeSheetDAO;
        this.userDAO = userDAO;
    }

    //Hàm lấy tất cả bảng công của từng người phân trang và search
    @Override
    public UserTimeSheetDTOPaginationResponse findAllTimeSheet(int page, int limit, String keyword, int month, int column, int sort){
        String columnString = null;
        String sortString = null;
        if(column == 1 ){
            columnString = "number_shifts_work";
        }else if(column == 2 ){
            columnString = "number_shifts_late_work";
        }else if(column == 0){
            columnString = null;
        }

        if(sort == 1 ){
            sortString = "ASC";
        }else if(sort == 2 ){
            sortString = "DESC";
        }else{
            sortString = null;
        }

        List<Timesheet> timesheets = timeSheetDAO.findAllUserTimeSheet(keyword, month,columnString, sortString);
        List<UserTimeSheetDTOResponse> userTimeSheetDTOResponses = transferUserTimeSheetToUserTimeSheetDTO(timesheets);
        UserTimeSheetDTOPaginationResponse userTimeSheetDTOPaginationResponse = findAllUserTimeSheetPaginationDTO(page, limit, userTimeSheetDTOResponses);

        return userTimeSheetDTOPaginationResponse;
    }

    //Hàm tạo bảng công tháng mới cho nhân viên
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createTimeSheetsOfStaff(int month){
        List<Timesheet> timesheets = new ArrayList<>();
        List<User> users = userDAO.findAllUserWorking();
        for (int i = 0; i < users.size(); i++){
            int id = users.get(i).getId();
            Timesheet timesheet = setTimeSheet(id,month);
            timesheets.add(i,timesheet);
        }
        try{
            timesheetRepository.saveAll(timesheets);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Save time sheet error");
        }
    }

    //Hàm thêm công hàng ngày
    @Override
    public void plusWordDay(List<Integer> ids){
        List<Timesheet> timesheets = new ArrayList<>();
        for(int  i = 0; i < ids.size(); i++) {
            Timesheet timesheet = timeSheetDAO.findAllUserTimeSheetById(ids.get(i));
            TimeSheetValidate.checkInputNumberWorkOnMonth(timesheet.getNumberShiftsWork());
            timesheet.setNumberShiftsWork(timesheet.getNumberShiftsWork() + 1);
            timesheet.setUpdatedAt();
            timesheets.add(timesheet);
        }
        saveAllTimesheet(timesheets);
    }

    public void saveAllTimesheet(List<Timesheet> timesheets){
        try{
            timesheetRepository.saveAll(timesheets);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Save list employee error" ,e);
        }
    }

    //Hàm thay đổi trạng thái sang đã tính lương
    @Override
    public void changeStatus(List<Integer> ids){
        List<Timesheet> timesheets = new ArrayList<>();
        for (int i =0 ; i < ids.size() ;i++ ){
            Timesheet timesheet = timeSheetDAO.findAllUserTimeSheetById(ids.get(i));
            timesheet.setStatus(ConstantVariableCommon.STATUS_TIMESHEET_2);
            timesheets.add(timesheet);
        }
        saveAllTimesheet(timesheets);
    }

    @Override
    //hàm tìm bảng công bằng user và id
    public UserTimeSheetDTOGetByIdResponse findTimeSheetByUserAndId(int id){
        Timesheet timesheet = timeSheetDAO.findTimeSheetById(id);
        UserTimeSheetDTOGetByIdResponse timeSheetDTOGetById = new UserTimeSheetDTOGetByIdResponse(timesheet.getId(), timesheet.getCode(), timesheet.getUser().getName(), timesheet.getNumberShiftsWork(), timesheet.getNumberShiftsLateWork(), timesheet.getMonth(), timesheet.getStatus());
        return timeSheetDTOGetById;
    }

    @Override
    //hàm sửa bảng công
    public void editTimeSheet(int id, EditTimeSheetDTORequest timesheet){
        TimeSheetValidate.checkInputNumberWorkOnMonth(timesheet.getNumberShiftsWork());
        TimeSheetValidate.checkInputNumberWorkOnMonth(timesheet.getNumberShiftsLateWork());
        Timesheet timesheetDB = timeSheetDAO.findTimeSheetById(id);
        timesheetDB.setNumberShiftsWork(timesheet.getNumberShiftsWork());
        timesheetDB.setNumberShiftsLateWork(timesheet.getNumberShiftsLateWork());
        timesheetDB.setStatus(timesheet.getStatus());

        saveTimeSheet(timesheetDB);
    }


    //Lưu bảng tính công
    private void saveTimeSheet(Timesheet timesheet){
        try{
            timesheetRepository.save(timesheet);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Save time sheet error", e);
        }
    }

    //Hàm cộng ngày đi muộn, về sớm
    @Override
    public void plusWordLateDay(List<Integer> ids){
        List<Timesheet> timesheets = new ArrayList<>();
        for (int i =0; i < ids.size(); i++) {
            Timesheet timesheet = timeSheetDAO.findAllUserTimeSheetById(ids.get(i));
            TimeSheetValidate.checkInputNumberWorkOnMonth(timesheet.getNumberShiftsLateWork());
            timesheet.setNumberShiftsLateWork(timesheet.getNumberShiftsLateWork() + 1);
            timesheets.add(timesheet);
        }
        saveAllTimesheet(timesheets);
    }

    //Hàm set value Timesheet
    private Timesheet setTimeSheet(int id, int month){
        Timesheet timesheet = new Timesheet();
        timesheet.setUser(userDAO.findUserById(id));
        timesheet.setCode(Common.GenerateCodeTimeSheet());
        timesheet.setMonth(month);
        timesheet.setNumberShiftsWork(0);
        timesheet.setNumberShiftsLateWork(0);
        timesheet.setCreatedAt();
        timesheet.setStatus(ConstantVariableCommon.STATUS_TIMESHEET_1);
        return timesheet;
    }

    // Chuyển user và timesheet sang UserTimeSheetDTO
    private List<UserTimeSheetDTOResponse> transferUserTimeSheetToUserTimeSheetDTO(List<Timesheet> timesheets){
        List<UserTimeSheetDTOResponse> timeSheetDTOResponses = new ArrayList<>();
        timesheets.forEach(timesheet -> {
            double salary = (timesheet.getUser().getSalaryDay())*(timesheet.getNumberShiftsWork())  - (ConstantVariableCommon.SALARY_EARLY * timesheet.getNumberShiftsLateWork());
            UserTimeSheetDTOResponse timeSheetDTOResponse = new UserTimeSheetDTOResponse(timesheet.getId(),timesheet.getCode(), timesheet.getUser().getName(), timesheet.getNumberShiftsWork(), timesheet.getNumberShiftsLateWork(),timesheet.getMonth(),salary, ConstantVariableCommon.statusTimeSheetIntToString(timesheet.getStatus()));
            timeSheetDTOResponses.add(timeSheetDTOResponse);
        });
        return timeSheetDTOResponses;
    }

    //Phân trang
    private UserTimeSheetDTOPaginationResponse findAllUserTimeSheetPaginationDTO (int page, int limit, List<UserTimeSheetDTOResponse> userTimeSheetDTOResponses){
        List<UserTimeSheetDTOResponse> userTimeSheetDTOResponseList = new ArrayList<>();
        if ((userTimeSheetDTOResponses.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                userTimeSheetDTOResponseList.add(userTimeSheetDTOResponses.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < userTimeSheetDTOResponses.size(); i++) {
                userTimeSheetDTOResponseList.add(userTimeSheetDTOResponses.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, userTimeSheetDTOResponses.size());
        UserTimeSheetDTOPaginationResponse userTimeSheetDTOPaginationResponse = new UserTimeSheetDTOPaginationResponse(userTimeSheetDTOResponseList, pagination);
        return userTimeSheetDTOPaginationResponse;
    }

    //Hàm Tạo file excel
    @Override
    public ByteArrayInputStream createFileExcel(int month) throws IOException {
        if (month == 0){
            month = 1 ;
        }
        List<Timesheet> timesheets = timeSheetDAO.findAllUserTimeSheetByMonth(month);

        String fileNamePath = Common.getNameAddress()+"/Excel/TimeSheet.xlsx";
        List<UserTimeSheetDTOExportExcel> timeSheetUsers = new ArrayList<>();
        for (int i = 0; i < timesheets.size(); i++){
            double salary = (timesheets.get(i).getUser().getSalaryDay())*(timesheets.get(i).getNumberShiftsWork()) - (ConstantVariableCommon.SALARY_EARLY * timesheets.get(i).getNumberShiftsLateWork());
            UserTimeSheetDTOExportExcel timeSheetUser = new UserTimeSheetDTOExportExcel(timesheets.get(i).getUser().getCode(), timesheets.get(i).getUser().getName(), timesheets.get(i).getNumberShiftsWork(), timesheets.get(i).getNumberShiftsLateWork(),timesheets.get(i).getMonth(),salary);
            timeSheetUsers.add(timeSheetUser);
        }

        ByteArrayInputStream out = ExportFileExcel.writeExcel(timeSheetUsers, fileNamePath);
        return out;
    }

    //hàm tải file excel về

}

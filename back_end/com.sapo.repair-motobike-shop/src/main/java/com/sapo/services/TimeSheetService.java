package com.sapo.services;

import com.sapo.dto.timesheets.EditTimeSheetDTORequest;
import com.sapo.dto.timesheets.UserTimeSheetDTOGetByIdResponse;
import com.sapo.dto.timesheets.UserTimeSheetDTOPaginationResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@Service
public interface TimeSheetService {
    //Hàm tìm tất cả bảng chấm công
    UserTimeSheetDTOPaginationResponse findAllTimeSheet(int page, int limit, String keyword, int month, int column, int sort);

    //Hàm tạo công tháng mới
    void createTimeSheetsOfStaff(int month);

    //Hàm Cộng ngày đi làm
    void plusWordDay(List<Integer> ids);

    //Hàm công ngày đi muộn
    void plusWordLateDay(List<Integer> ids);

    //hàm thay đổi trạng thái
    void changeStatus(List<Integer> ids);

    //Hàm tìm bảng công của nhân viên theo id
    UserTimeSheetDTOGetByIdResponse  findTimeSheetByUserAndId(int id);

    //Hàm sửa bảng công
    void editTimeSheet(int id, EditTimeSheetDTORequest timesheet);

    //Hàm tạo file excel bảng công theo tháng
    ByteArrayInputStream createFileExcel(int month) throws IOException;

}

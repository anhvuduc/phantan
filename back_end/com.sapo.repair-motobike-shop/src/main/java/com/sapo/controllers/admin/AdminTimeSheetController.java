package com.sapo.controllers.admin;

import com.sapo.common.Common;
import com.sapo.dto.timesheets.*;
import com.sapo.services.TimeSheetService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLConnection;

@RestController
@RequestMapping("/api/admin/time-sheet")
@CrossOrigin("http://localhost:3000")
@PreAuthorize("hasRole('ADMIN')")
public class AdminTimeSheetController {
    private final TimeSheetService timeSheetService;

    public AdminTimeSheetController(TimeSheetService timeSheetService) {
        this.timeSheetService = timeSheetService;
    }
    //API List Công của nhân viên và lương tạm thời
    @GetMapping("/list")
    public ResponseEntity<UserTimeSheetDTOPaginationResponse> listTimeSheetOfStaff(@RequestParam int page,@RequestParam  int limit, @RequestParam  String keyword, @RequestParam int month, @RequestParam int column, @RequestParam int sort){
        UserTimeSheetDTOPaginationResponse timeSheets = timeSheetService.findAllTimeSheet( page, limit, keyword, month,column, sort);
        return ResponseEntity.ok(timeSheets);
    }
    //API Tạo công tháng mới
    @PostMapping
    public ResponseEntity<Void> createTimeSheetOfStaff(@RequestBody UserTimeSheetNewDTO user){
        timeSheetService.createTimeSheetsOfStaff(user.getMonth());
        return ResponseEntity.ok().build();
    }

    //API Tính công
    @PutMapping("/work")
    public ResponseEntity<Void> plusWorkDayOfStaff(@RequestBody TimeSheetWorkRequest timeSheetWorkRequest){
        System.out.println("ID"+ timeSheetWorkRequest.getIds().get(1));
        timeSheetService.plusWordDay(timeSheetWorkRequest.getIds());
        return ResponseEntity.ok().build();
    }

    //API trừ đi muộn, về sớm
    @PutMapping("/work-late")
    public ResponseEntity<Void> plusWorkLateDayOfStaff(@RequestBody TimeSheetWorkRequest timeSheetWorkRequest){
        timeSheetService.plusWordLateDay(timeSheetWorkRequest.getIds());
        return ResponseEntity.ok().build();
    }

    // API thay trạng thái đã trả lương
    @PutMapping("/status")
    public ResponseEntity<Void> changeStatusTimeSheet(@RequestBody TimeSheetWorkRequest timeSheetWorkRequest){
        timeSheetService.changeStatus(timeSheetWorkRequest.getIds());
        return ResponseEntity.ok().build();
    }

    // API Tìm timesheet theo id của timesheet và user
    @GetMapping("/{id}")
    public ResponseEntity<UserTimeSheetDTOGetByIdResponse> findTimesheetByUserAndId(@PathVariable("id") int id){
        UserTimeSheetDTOGetByIdResponse timesheet = timeSheetService.findTimeSheetByUserAndId(id);
        return ResponseEntity.ok(timesheet);
    }
    //Hàm thay đổi trạng thái
    @PutMapping("/{id}")
    public ResponseEntity<Void> changeStatusTimeSheet(@PathVariable int id, @RequestBody EditTimeSheetDTORequest timeSheet){
        timeSheetService.editTimeSheet(id, timeSheet);
        return ResponseEntity.ok().build();
    }

    // Hàm tạo file excel bảng công
    @PostMapping("/excel")
    public ResponseEntity<Void> createFileExcel(@RequestBody UserTimeSheetNewDTO timeSheetMonth) throws IOException {
        timeSheetService.createFileExcel(timeSheetMonth.getMonth());
        return ResponseEntity.ok().build();
    }

    //Hàm download file excel
    @PostMapping("/download")
    public void downloadFile(@RequestBody UserTimeSheetNewDTO timeSheetMonth, HttpServletResponse response) throws IOException {
        ByteArrayInputStream in = timeSheetService.createFileExcel(timeSheetMonth.getMonth());
        // return IOUtils.toByteArray(in);
        
        File file = new File(Common.getNameAddress() + "/Excel/TimeSheet.xlsx");
        if (file.exists()) {
            //get the mimetype
            String mimeType = URLConnection.guessContentTypeFromName(file.getName());
            if (mimeType == null) {
                //unknown mimetype so set the mimetype to application/octet-stream
                mimeType = "application/octet-stream";
            }
            response.setContentType(mimeType);
            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() + "\""));
            response.setContentLength((int) file.length());
            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
            FileCopyUtils.copy(inputStream, response.getOutputStream());
        }
    }
}

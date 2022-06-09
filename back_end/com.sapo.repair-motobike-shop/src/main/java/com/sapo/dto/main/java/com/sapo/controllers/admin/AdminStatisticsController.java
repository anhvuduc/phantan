package com.sapo.controllers.admin;

import com.sapo.dto.statistics.*;
import com.sapo.services.StatisticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/statistics")
@PreAuthorize("hasRole('ADMIN')")
public class AdminStatisticsController {
    private final StatisticsService statisticsService;

    public AdminStatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    // Api thống kê số đơn hàng và tổng số tiền từng khách hàng
    @GetMapping("/customers")
    public ResponseEntity<List<StatisticsCustomerDTO>> selectCustomerAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<StatisticsCustomerDTO> statisticsCustomerDTOS = statisticsService.selectCustomerAndInvoiceInfo(dateStart, dateEnd);
        return ResponseEntity.ok(statisticsCustomerDTOS);
    }

    // Api thống kê số đơn hàng và tổng số tiền từng phụ tùng
    @GetMapping("/materials")
    public ResponseEntity<List<StatisticMaterialDTO>> selectMaterialAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<StatisticMaterialDTO> statisticMaterialDTOS = statisticsService.selectMaterialAndInvoiceInfo(dateStart, dateEnd);
        return ResponseEntity.ok(statisticMaterialDTOS);
    }

    // Api thống kê số đơn hàng và tổng số tiền từng dich vu
    @GetMapping("/services")
    public ResponseEntity<List<StatisticServiceDTO>> selectServiceAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<StatisticServiceDTO> statisticServiceDTOS = statisticsService.selectServiceAndInvoiceInfo(dateStart, dateEnd);
        return ResponseEntity.ok(statisticServiceDTOS);
    }

    // Api thống kê doanh thu
    @GetMapping("/revunes")
    public ResponseEntity<List<RevuneDTO>> selectRevune(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<RevuneDTO> revuneDTOS = statisticsService.selectRevune(dateStart, dateEnd);
        return ResponseEntity.ok(revuneDTOS);
    }

    // Api thống kê luong nhan vien
    @GetMapping("/salary")
    public ResponseEntity<List<SalaryDTO>> selectSalary(@RequestParam int monthS, @RequestParam int monthE) throws ParseException {
        List<SalaryDTO> salaryDTOS = statisticsService.selectSalary(monthS, monthE);
        return ResponseEntity.ok(salaryDTOS);
    }

    // Api thống kê số nhap hang
    @GetMapping("/input")
    public ResponseEntity<List<InputMaterialDTO>> selectInput(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<InputMaterialDTO> inputMaterialDTOS = statisticsService.selectInput(dateStart, dateEnd);
        return ResponseEntity.ok(inputMaterialDTOS);
    }

    // Api thống kê doanh thu theo ngày
    @GetMapping("/invoices")
    public ResponseEntity<List<RevenuePerDayDTO>> selectInvoice(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<RevenuePerDayDTO> revenuePerDayDTOS = statisticsService.selectRevenuePerDay(dateStart, dateEnd);
        return ResponseEntity.ok(revenuePerDayDTOS);
    }
}

package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.dao.jpa.StatisticsDAO;
import com.sapo.dto.statistics.*;
import com.sapo.entities.Invoice;
import com.sapo.services.StatisticsService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private final StatisticsDAO statisticsDAO;
//    private final StatisticsDAO statisticsDAOjdbc;

    public StatisticsServiceImpl(StatisticsDAO statisticsDAO) {
        this.statisticsDAO = statisticsDAO;
//        this.statisticsDAOjdbc = statisticsDAOjdbc;
    }

    //Hàm thống số hóa đơn và tổng tiền các hóa đơn của khách hàng
    @Override
    public List<StatisticsCustomerDTO> selectCustomerAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException {
        List<StatisticsCustomerDTO> statisticsCustomerDTOS = statisticsDAO.selectCustomerAndInvoicesInfo();

        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);

        List<StatisticsCustomerDTO> statisticsCustomerList = transferArraysToArrayList(statisticsCustomerDTOS, dateStart1, dateEnd1);
        return statisticsCustomerList;
    }

    //Hàm chuyển từ arrays sang arraylist và điều kiện date
    private List<StatisticsCustomerDTO> transferArraysToArrayList(List<StatisticsCustomerDTO> statisticsCustomerDTOS, long dateStart, long dateEnd){
        List<StatisticsCustomerDTO> statisticsCustomerList = new ArrayList<>();
        Iterator itr = statisticsCustomerDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String code = String.valueOf(obj[1]);
            String name = String.valueOf(obj[2]);
            String phone = String.valueOf(obj[3]);
            String licensePlate = String.valueOf(obj[4]);
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[5]));
            int numberPurchases = Integer.parseInt(String.valueOf(obj[6]));
            long createAt = Long.parseLong(String.valueOf(obj[7]));

            StatisticsCustomerDTO statisticsCustomerDTO = new StatisticsCustomerDTO(id, code, name, phone, licensePlate, totalPurchased, numberPurchases, createAt);
            if(statisticsCustomerDTO.getCreateAt() >= dateStart && statisticsCustomerDTO.getCreateAt() <= dateEnd){
                statisticsCustomerList.add(statisticsCustomerDTO);
            }
        }
            return statisticsCustomerList;
    }

    @Override
    public List<StatisticMaterialDTO> selectMaterialAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException {
        List<StatisticMaterialDTO> statisticMaterialDTOS = statisticsDAO.selectMaterialAndInvoiceInfo();
        List<StatisticMaterialDTO> statisticMaterialList = new ArrayList<>();
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);

        Iterator itr = statisticMaterialDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String name = String.valueOf(obj[1]);
            String code = String.valueOf(obj[2]);
            int numberInvoices = Integer.parseInt(String.valueOf(obj[3]));
            int numberPurchases = Integer.parseInt(String.valueOf(obj[4]));
            int numberInventory = Integer.parseInt(String.valueOf(obj[5]));
            BigDecimal outPutPrice = new BigDecimal(String.valueOf(obj[6]));
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[7]));
            long createAt = Long.parseLong(String.valueOf(obj[8]));

            StatisticMaterialDTO statisticMaterialDTO = new StatisticMaterialDTO(id, name, code, numberInvoices, numberPurchases, numberInventory,outPutPrice, totalPurchased, createAt);

            if (statisticMaterialDTO.getCreateAt() >= dateStart1 && statisticMaterialDTO.getCreateAt() <= dateEnd1){
                statisticMaterialList.add(statisticMaterialDTO);
            }
        }
        return statisticMaterialList;
    }


    @Override
    public List<StatisticServiceDTO> selectServiceAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException {
        List<StatisticServiceDTO> statisticServiceDTOS = statisticsDAO.selectServiveAndInvoiceInfo();
        List<StatisticServiceDTO> statisticServiceList = new ArrayList<>();
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);

        Iterator itr = statisticServiceDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String name = String.valueOf(obj[1]);
            String code = String.valueOf(obj[2]);
            BigDecimal price = new BigDecimal(String.valueOf(obj[3]));
            int numberInvoices = Integer.parseInt(String.valueOf(obj[4]));
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[5]));
            long createAt = Long.parseLong(String.valueOf(obj[6]));

            StatisticServiceDTO statisticServiceDTO = new StatisticServiceDTO(id, name, code , price, numberInvoices, totalPurchased, createAt);

            if (statisticServiceDTO.getCreateAt() >= dateStart1 && statisticServiceDTO.getCreateAt() <= dateEnd1){
                statisticServiceList.add(statisticServiceDTO);
            }
        }
        return statisticServiceList;
    }

    @Override
    public List<SalaryDTO> selectSalary(int monthS, int monthE) throws ParseException {
        List<SalaryDTO> salaryDTOS = statisticsDAO.selectSalary();
        List<SalaryDTO> salaryDTOList = new ArrayList<>();

        Iterator itr = salaryDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String code = String.valueOf(obj[1]);
            String name = String.valueOf(obj[2]);
            BigDecimal salaryDay = new BigDecimal(String.valueOf(obj[3]));
            int month1 = Integer.parseInt(String.valueOf(obj[4]));
            int numberShiftWork = Integer.parseInt(String.valueOf(obj[5]));
            int numberShiftLateWork = Integer.parseInt(String.valueOf(obj[6]));
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[7]));

            SalaryDTO salaryDTO = new SalaryDTO(id, code, name , salaryDay, month1, numberShiftWork, numberShiftLateWork, totalPurchased );

            if (salaryDTO.getMonth() >= monthS && salaryDTO.getMonth() <= monthE){
                salaryDTOList.add(salaryDTO);
            }
        }
        return salaryDTOList;
    }

    @Override
    public List<RevuneDTO> selectRevune(String dateStart, String dateEnd) throws ParseException {
        List<RevuneDTO> revuneDTOS = statisticsDAO.selectRevune();
        List<RevuneDTO> revuneDTOList = new ArrayList<>();
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);

        Iterator itr = revuneDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            long createAt = Long.parseLong(String.valueOf(obj[0]));
            BigDecimal totalOutput = new BigDecimal(String.valueOf(obj[1]));

            RevuneDTO revuneDTO = new RevuneDTO(createAt, totalOutput);

            if (revuneDTO.getCreateAt() >= dateStart1 && revuneDTO.getCreateAt() <= dateEnd1){
                revuneDTOList.add(revuneDTO);
            }
        }
        return revuneDTOList;
    }

    @Override
    public List<InputMaterialDTO> selectInput(String dateStart, String dateEnd) throws ParseException {
        List<InputMaterialDTO> inputMaterialDTOS = statisticsDAO.selectInput();
        List<InputMaterialDTO> inputMaterialDTOList = new ArrayList<>();
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);

        Iterator itr = inputMaterialDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String code = String.valueOf(obj[1]);
            String name = String.valueOf(obj[2]);
            BigDecimal inputPrice = new BigDecimal(String.valueOf(obj[3]));
            int quanity = Integer.parseInt(String.valueOf(obj[4]));
            BigDecimal totalMoney = new BigDecimal(String.valueOf(obj[5]));
            long createAt = Long.parseLong(String.valueOf(obj[6]));

            InputMaterialDTO inputMaterialDTO = new InputMaterialDTO(id,code,name, inputPrice, quanity, totalMoney, createAt);

            if (inputMaterialDTO.getCreateAt() >= dateStart1 && inputMaterialDTO.getCreateAt() <= dateEnd1){
                inputMaterialDTOList.add(inputMaterialDTO);
            }
        }
        return inputMaterialDTOList;
    }

    @Override
    public List<RevenuePerDayDTO> selectRevenuePerDay(String dateStart, String dateEnd) throws ParseException {
        List<RevenuePerDayDTO> revenuePerDayDTOS = new ArrayList<>();
        List<Invoice> invoices = statisticsDAO.findAllInvoiceByDate(Common.getMilliSeconds(dateStart), Common.getMilliSeconds(dateEnd));

        //Chuyển create_at thành ngày/tháng/năm (không có thời gian)
        for (Invoice invoice : invoices){
            invoice.setCreatedAt(Common.getMilliSeconds(Common.getDateByMilliSecond(invoice.getCreatedAt())));
        }

        //Thêm list
        for (long i = Common.getMilliSeconds(dateStart) ; i <= Common.getMilliSeconds(dateEnd); i += 86400000 ){
            RevenuePerDayDTO revenuePerDayDTO = new RevenuePerDayDTO();
            revenuePerDayDTO.setCreateAt(i);
            BigDecimal sum = new BigDecimal(0);
            for(int j = 0; j< invoices.size(); j++ ){
                if(invoices.get(j).getCreatedAt() == i){
                    sum = sum.add(invoices.get(j).getTotal());

                }
            }
            revenuePerDayDTO.setTotalOutput(sum);
            revenuePerDayDTOS.add(revenuePerDayDTO);
        }

        return revenuePerDayDTOS;
    }

}

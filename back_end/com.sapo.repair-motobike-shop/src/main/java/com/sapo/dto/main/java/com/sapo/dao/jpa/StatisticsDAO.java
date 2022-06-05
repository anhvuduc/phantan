package com.sapo.dao.jpa;

import com.sapo.dto.statistics.*;
import com.sapo.entities.Invoice;
import com.sapo.services.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "StatisticsDAO")
@Transactional(rollbackOn = Exception.class)
public class StatisticsDAO {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());

    //Hàm thống số hóa đơn và tổng tiền các hóa đơn của khách hàng
    public List<StatisticsCustomerDTO> selectCustomerAndInvoicesInfo() {
        String sql = "select\n" +
                "       tbl_vehicle_customer.customer_id,\n" +
                "       tbl_customers.code,\n" +
                "       tbl_customers.name,\n" +
                "       tbl_customers.phone,\n" +
                "       tbl_vehicles.license_plate,\n" +
                "       tbl_invoices.total as total_purchased,\n" +
                "       count(customer_id) as number_purchases,\n" +
                "       tbl_invoices.created_at\n" +
                "from tbl_invoices, tbl_customers, tbl_vehicles, tbl_vehicle_customer\n" +
                "where tbl_invoices.vehicle_customer_id = tbl_vehicle_customer.id\n" +
                "and tbl_vehicle_customer.customer_id = tbl_customers.id\n" +
                "and tbl_vehicle_customer.vehicle_id = tbl_vehicles.id\n" +
                "group by tbl_vehicle_customer.customer_id";

        Query query = entityManager.createNativeQuery(sql);
        List<StatisticsCustomerDTO> statisticsCustomerDTOS = (List<StatisticsCustomerDTO>) query.getResultList();

        return statisticsCustomerDTOS;
    }

    //Hàm thống kê số hóa đơn và tổng tiền các hóa đơn của phụ tùng
    public List<StatisticMaterialDTO> selectMaterialAndInvoiceInfo() {
        String sql = "select tbl_materials.id,tbl_materials.name,tbl_materials.code\n" +
                "        ,count(tbl_material_order.material_id) as numberInvoices, sum(tbl_material_order.quantity) as numberPurchases,\n" +
                "       (tbl_materials.quantity - sum(tbl_material_order.quantity)) as numberInventory,\n" +
                "       tbl_materials.output_price,\n" +
                "       (tbl_material_order.quantity * tbl_materials.output_price) as totalPurchased, " +
                "       tbl_invoices.created_at\n" +
                "from tbl_invoices, tbl_material_order, tbl_materials\n" +
                "where tbl_invoices.id = tbl_material_order.invoice_id\n" +
                "  and tbl_material_order.material_id = tbl_materials.id\n" +
                " group by tbl_materials.id " +
                " ORDER BY numberPurchases ASC ";
        Query query = entityManager.createNativeQuery(sql);

        List<StatisticMaterialDTO> statisticMaterialDTOS = (List<StatisticMaterialDTO>) query.getResultList();

        return statisticMaterialDTOS;
    }

    //Hàm thống kê số hóa đơn và tổng tiền các hóa đơn của dịch vụ
    public List<StatisticServiceDTO> selectServiveAndInvoiceInfo() {
        String sql = "select tbl_services.id,\n" +
                "       tbl_services.name,\n" +
                "       tbl_services.code,\n" +
                "       tbl_services.price,\n" +
                "       count(tbl_service_order.service_id) as numbersInvoives, " +
                "       (tbl_services.price *  count(tbl_service_order.service_id)) as totalPurchas,\n" +
                "tbl_invoices.created_at\n" +
                "from tbl_services, tbl_service_order, tbl_invoices\n" +
                "where tbl_invoices.id = tbl_service_order.invoice_id\n" +
                "  and tbl_service_order.service_id = tbl_services.id\n" +
                " group by tbl_services.id " +
                " ORDER BY numbersInvoives ASC ";

        Query query = entityManager.createNativeQuery(sql);

        List<StatisticServiceDTO> statisticServiceDTOS = (List<StatisticServiceDTO>) query.getResultList();

        return statisticServiceDTOS;
    }

    //Hàm thống kê doanh thu
    public List<RevuneDTO> selectRevune() {
        String sql = "select " +
                "tbl_invoices.created_at,\n" +
                "sum(tbl_invoices.total) as totalOuput\n" +
                "from tbl_invoices\n" +
                "group by tbl_invoices.created_at\n";

        Query query = entityManager.createNativeQuery(sql);

        List<RevuneDTO> revuneDTOS = (List<RevuneDTO>) query.getResultList();

        return revuneDTOS;
    }

    //Hàm thống kê luong nhan vien
    public List<SalaryDTO> selectSalary() {
        String sql = "select tbl_users.id,\n" +
                "       tbl_users.code,\n" +
                "       tbl_users.name,\n" +
                "       tbl_users.salary_day,\n" +
                "       tbl_timesheets.month,\n" +
                "       tbl_timesheets.number_shifts_work,\n" +
                "       tbl_timesheets.number_shifts_late_work,\n" +
                "       (tbl_timesheets.number_shifts_work*tbl_users.salary_day - tbl_timesheets.number_shifts_late_work*50000)as totalSalary\n" +
                "from tbl_users, tbl_timesheets\n" +
                "where tbl_timesheets.user_id = tbl_users.id\n";

        Query query = entityManager.createNativeQuery(sql);

        List<SalaryDTO> salaryDTOS = (List<SalaryDTO>) query.getResultList();

        return salaryDTOS;
    }

    //Hàm thống kê nhap hang (phụ tùng)
    public List<InputMaterialDTO> selectInput() {
        String sql = "select\n" +
                "       tbl_materials.id,\n" +
                "       tbl_materials.code,\n" +
                "       tbl_materials.name,\n" +
                "       tbl_materials.input_price,\n" +
                "       tbl_receipt_material.quantity,\n" +
                "       tbl_receipt_material.quantity*tbl_materials.input_price as totalMoney,\n" +
                "       tbl_receipts.created_at\n" +
                "from tbl_receipts,tbl_receipt_material, tbl_materials\n" +
                "where tbl_receipts.id = tbl_receipt_material.receipt_id\n" +
                "and tbl_receipt_material.material_id = tbl_materials.id\n";

        Query query = entityManager.createNativeQuery(sql);

        List<InputMaterialDTO> inputMaterialDTOS = (List<InputMaterialDTO>) query.getResultList();

        return inputMaterialDTOS;
    }


    public  List<Invoice> findAllInvoiceByDate(long dateStart, long dateEnd){
        String sql = "SELECT * FROM tbl_invoices " +
                " Where tbl_invoices.created_at >= " + dateStart +
                " AND tbl_invoices.created_at <= " + dateEnd;
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        return query.getResultList();
    }

}

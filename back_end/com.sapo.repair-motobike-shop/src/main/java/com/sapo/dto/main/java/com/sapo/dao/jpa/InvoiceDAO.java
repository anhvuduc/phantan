package com.sapo.dao.jpa;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.dto.invoices.InvoiceListPaginationResponseDTO;
import com.sapo.entities.*;
import com.sapo.services.impl.InvoiceServiceImpl;
import com.sapo.services.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "InvoiceDAO")
@Transactional(rollbackOn = Exception.class)
public class InvoiceDAO {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceServiceImpl.class.toString());

    //Hàm lấy list hóa đơn theo trạng thái và keyword(nếu có)
    public List<Invoice> findAllInvoiceByStatusAndKeyword(String keyword, List<Integer> status, String sort) {
        String sql = "SELECT * FROM tbl_invoices,tbl_vehicles,tbl_customers,tbl_vehicle_customer" +
                " WHERE tbl_invoices.vehicle_customer_id = tbl_vehicle_customer.id" +
                " AND tbl_vehicle_customer.customer_id = tbl_customers.id" +
                " AND tbl_vehicle_customer.vehicle_id = tbl_vehicles.id";

        if(keyword != null && keyword.length() != 0){
            sql = sql + " AND LCASE(CONCAT(tbl_vehicles.license_plate, ' ', tbl_invoices.code, '', tbl_customers.name, '', tbl_customers.phone)) LIKE LCASE('%" + keyword + "%') ";
        }
        if(status.size() > 0){
            String statusSql = " AND (";
            String statusSql1 = " ";

            for(int  i =0; i < status.size() ; i++ ){
                statusSql1 = statusSql1 + " tbl_invoices.status = " +status.get(i) + " OR ";
            }
            sql = sql + statusSql + statusSql1 + " 1 = 2 )";
            System.out.println(sql);
        }
        if(sort != null){
            sql = sql + " ORDER BY tbl_invoices.status " +sort ;
        }
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        List<Invoice> invoices = query.getResultList();
        System.out.println(invoices.size());
        return invoices;
    }

    //Hàm lấy list hóa đơn theo trạng thái và keyword(nếu có)
    public List<Invoice> findAllInvoiceBuyMaterial(String keyword, List<Integer> status) {
        String sql = "SELECT * FROM tbl_invoices,tbl_customers,tbl_vehicle_customer" +
                " WHERE tbl_invoices.vehicle_customer_id = tbl_vehicle_customer.id" +
                " AND tbl_vehicle_customer.customer_id = tbl_customers.id" +
                " AND tbl_vehicle_customer.vehicle_id is null";

        if(keyword != null && keyword.length() != 0){
            sql = sql + " AND LCASE(CONCAT(tbl_invoices.code, '', tbl_customers.name, '', tbl_customers.phone)) LIKE LCASE('%" + keyword + "%') ";
        }
        if(status.size() > 0){
            String statusSql = " AND (";
            String statusSql1 = " ";

            for(int  i =0; i < status.size() ; i++ ){
                statusSql1 = statusSql1 + " tbl_invoices.status = " +status.get(i) + " OR ";
            }
            sql = sql + statusSql + statusSql1 + " 1 = 2 )";
            System.out.println(sql);
        }
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        List<Invoice> invoices = query.getResultList();
        return invoices;
    }
    
    //Hàm lấy list hóa đơn đang xử lý bằng keyword(nếu có)
    public List<Invoice> findAllInvoiceInProcessByKeyword(String keyword) {
        String sql = "SELECT * FROM tbl_invoices,tbl_vehicles,tbl_customers,tbl_vehicle_customer" +
                " WHERE tbl_invoices.vehicle_customer_id = tbl_vehicle_customer.id" +
                " AND tbl_vehicle_customer.customer_id = tbl_customers.id" +
                " AND tbl_vehicle_customer.vehicle_id = tbl_vehicles.id AND ( tbl_invoices.status = " + ConstantVariableCommon.STATUS_INVOICE_4 +" )";
        if(keyword != null){
            sql = sql + " AND LCASE(CONCAT(tbl_customers.license_plate, ' ', tbl_invoices.code)) LIKE LCASE('%" + keyword + "%') ";
        }
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        List<Invoice> invoices = query.getResultList();
        System.out.println(invoices.size());
        return invoices;
    }
    
    //Hàm lấy list hóa đơn có thể xóa (status = 1,2,7)
    public List<Invoice> findAllInvoiceCanDelete (String keyword){
        String sql = "SELECT * FROM tbl_invoices,tbl_vehicles,tbl_customers,tbl_vehicle_customer" +
                " WHERE tbl_invoices.vehicle_customer_id = tbl_vehicle_customer.id" +
                " AND tbl_vehicle_customer.customer_id = tbl_customers.id" +
                " AND tbl_vehicle_customer.vehicle_id = tbl_vehicles.id AND ( tbl_invoices.status = " + ConstantVariableCommon.STATUS_INVOICE_1 +" OR tbl_invoices.status = " + ConstantVariableCommon.STATUS_INVOICE_2 +" OR tbl_invoices.status = " + ConstantVariableCommon.STATUS_INVOICE_7 +" )";
        if(keyword != null){
            sql = sql + " AND LCASE(CONCAT(tbl_customers.license_plate, ' ', tbl_invoices.code)) LIKE LCASE('%" + keyword + "%') ";
        }
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        List<Invoice> invoices = query.getResultList();
        System.out.println(invoices.size());
        return invoices;
    }

    //Hàm tìm customer bằng id
    public Customer findCustomerById(int id) {
        String sql ="SELECT * FROM tbl_customers where id = " +id;
        Query query = entityManager.createNativeQuery(sql, Customer.class);
        Customer customer = (Customer) query.getSingleResult();
        return customer;
    }
    
    //Hàm tìm thợ sửa sẵn sàng sửa xe bằng id
    public User findUserReadyFixById(int id) {
        String sql ="SELECT * FROM tbl_users where (tbl_users.id = " +id + ") AND ( tbl_users.status = " + ConstantVariableCommon.STATUS_USER_4 +" )" ;
        Query query = entityManager.createNativeQuery(sql, User.class);
        User user = (User) query.getSingleResult();
        return user;
    }

    //hàm tìm Invoice theo id
    public Invoice findInvoiceById(int id ){
        String sql ="SELECT * FROM tbl_invoices where id = " +id;
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        Invoice invoice = (Invoice) query.getSingleResult();
        return invoice;
    }
    //Hàm tìm phụ kiện được xác nhận bằng id hóa đơn
    public List<MaterialOrder> findMaterialConfirmOrderByIdInvoice(int id){
        String sql ="SELECT * FROM tbl_material_order where invoice_id = " +id +" AND status = " +ConstantVariableCommon.STATUS_MATERIAL_ORDER_1;
        Query query = entityManager.createNativeQuery(sql, MaterialOrder.class);
        List<MaterialOrder> materialOrders = query.getResultList();
        return materialOrders;
    }

    //Hàm tìm dịch vụ xác nhận  bằng id hóa đơn
    public List<ServiceOrder> findServiceConfirmOrderByIdInvoice(int id){
        String sql ="SELECT * FROM tbl_service_order where invoice_id = " +id +" AND status = " +ConstantVariableCommon.STATUS_SERVICE_ORDER_1;
        Query query = entityManager.createNativeQuery(sql, ServiceOrder.class);
        List<ServiceOrder> serviceOrders = query.getResultList();
        return serviceOrders;
    }

    //Hàm tìm phụ kiện bằng id hóa đơn
    public List<MaterialOrder> findMaterialOrderByIdInvoice(int id){
        String sql ="SELECT * FROM tbl_material_order where invoice_id = " +id;
        Query query = entityManager.createNativeQuery(sql, MaterialOrder.class);
        List<MaterialOrder> materialOrders = query.getResultList();
        return materialOrders;
    }

    //Hàm tìm dịch vụ bằng id hóa đơn
    public List<ServiceOrder> findServiceOrderByIdInvoice(int id){
        String sql ="SELECT * FROM tbl_service_order where invoice_id = " +id;
        Query query = entityManager.createNativeQuery(sql, ServiceOrder.class);
        List<ServiceOrder> serviceOrders = query.getResultList();
        return serviceOrders;
    }

    //Hàm tìm phụ kiện order bằng id
    public MaterialOrder findMaterialOrderById(int id){
        String sql ="SELECT * FROM tbl_material_order where id = " +id;
        Query query = entityManager.createNativeQuery(sql, MaterialOrder.class);
        MaterialOrder materialOrder = (MaterialOrder) query.getSingleResult();
        return materialOrder;
    }

    //Hàm tìm dịch vụ order bằng id
    public ServiceOrder findServiceOrderById(int id){
        String sql ="SELECT * FROM tbl_service_order where id = " +id;
        Query query = entityManager.createNativeQuery(sql, ServiceOrder.class);
        ServiceOrder serviceOrder = (ServiceOrder) query.getSingleResult();
        return serviceOrder;
    }

    //List danh sách phiếu sửa chữa chưa có thợ sửa
    public List<Invoice>  findAllInvoiceNoFixer(String keyword){
        String sql ="SELECT * FROM tbl_invoices,tbl_vehicles,tbl_customers,tbl_vehicle_customer" +
                " WHERE tbl_invoices.vehicle_customer_id = tbl_vehicle_customer.id" +
                " AND tbl_vehicle_customer.customer_id = tbl_customers.id" +
                " AND tbl_vehicle_customer.vehicle_id = tbl_vehicles.id ";
        if(keyword != null){
            sql = sql + " AND LCASE(CONCAT(tbl_customers.license_plate, ' ', tbl_invoices.code)) LIKE LCASE('%" + keyword + "%') ";
        }
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        List<Invoice> invoices = query.getResultList();
        return invoices;
    }


    //Lấy list danh sách phiếu sửa chữa có trạng thái 1,2,3,7
    public List<Invoice> findAllInvoiceByStatusOfStaff(List<Integer> status){
        String sql = "SELECT * FROM tbl_invoices,tbl_vehicles,tbl_customers,tbl_vehicle_customer" +
                " WHERE tbl_invoices.vehicle_customer_id = tbl_vehicle_customer.id" +
                " AND tbl_vehicle_customer.customer_id = tbl_customers.id" +
                " AND tbl_vehicle_customer.vehicle_id = tbl_vehicles.id ";

        if(status.size() > 0){
            String statusSql = " AND tbl_user_role.user_id = tbl_users.id AND ( ";
            String statusSql1 = " ";

            for(int  i =0; i < status.size() ; i++ ){
                statusSql1 = statusSql1 + " role_id = " +status.get(i) + " OR ";
            }
            sql = sql + statusSql + statusSql1 + " 1 = 2 )";
            System.out.println(sql);
        }
        Query query = entityManager.createNativeQuery(sql, Invoice.class);
        List<Invoice> invoices = query.getResultList();
        System.out.println(invoices.size());
        return invoices;
    }
}

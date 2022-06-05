package com.sapo.dao.jpa;

import com.sapo.entities.ServiceOrder;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "ServiceOrderDAO")
@Transactional(rollbackOn = Exception.class)
public class ServiceOrderDAO {
    @PersistenceContext
    private EntityManager entityManager;

    public ServiceOrder findServiceOrderByID(int id){
        String sql = "select * from tbl_service_order where id = " + id ;
        Query query = entityManager.createNativeQuery(sql,ServiceOrder.class);
        return (ServiceOrder) query.getSingleResult();
    }
    // tim kiem service order bang code hoac bang ten service hoac bang code cua hoa don
    public List<ServiceOrder> findServiceOrderByKeyWord(String keyword){
        String sql = "select tbl_service_order.* " +
                "from tbl_service_order,tbl_invoices,tbl_services " +
                "where tbl_service_order.invoice_id = tbl_invoices.id " +
                "and tbl_service_order.service_id = tbl_services.id  " +
                "and lcase(concat(tbl_service_order.code,' ' ,tbl_services.name,' ', tbl_invoices.code)) like LCASE('%" + keyword + "%'); ";
        Query query = entityManager.createNativeQuery(sql,ServiceOrder.class);
        return query.getResultList();
    }

    // tim kiem tat ca cac service_order
    public List<ServiceOrder> findAllServiceOrder(){
        String sql = "select * from tbl_service_order where deleted_at is null or deleted_by is null";
        Query query = entityManager.createNativeQuery(sql,ServiceOrder.class);
        return query.getResultList();
    }
}

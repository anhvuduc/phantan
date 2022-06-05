package com.sapo.dao.jpa;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.entities.Customer;
import com.sapo.entities.Service;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "ServiceDAO")
@Transactional(rollbackOn = Exception.class)
public class ServiceDAO {
    @PersistenceContext
    private EntityManager entityManager;


    // Tìm service bằng id
    public Service findServiceById(int id) {
        String sql = "select * from tbl_services where id = " + id ;
        Query query = entityManager.createNativeQuery(sql, Service.class);
        return (Service) query.getSingleResult();
    }

    //Tìm service bằng keyword
    public List<Service> findServiceByKeyWord(String keyword) {
        String sql = "select * from tbl_services where 1=1 ";
        if(keyword.length() != 0 && keyword != null){
            sql = sql + " AND lcase(concat(tbl_services.name,'',tbl_services.code,' ', tbl_services.price,' ', tbl_services.description)) LIKE LCASE('%" + keyword + "%')";
        }
        sql = sql + " AND tbl_services.status !=" + ConstantVariableCommon.STATUS_SERVICE_3;
        Query query = entityManager.createNativeQuery(sql, Service.class);
        List<Service> services = query.getResultList();
        return services;
    }
    //Tìm tất cả các service đang phục vụ có keyword
    public List<Service> searchListServiceStillServing(String keyword){
        String sql = "select * from tbl_services where tbl_services.status = " + ConstantVariableCommon.STATUS_SERVICE_1;
        if(keyword.length() != 0 && keyword != null){
            sql = sql + " AND lcase(concat(tbl_services.name,'',tbl_services.code,' ', tbl_services.price,' ', tbl_services.description)) LIKE LCASE('%" + keyword + "%')";
        }
        Query query = entityManager.createNativeQuery(sql, Service.class);
        List<Service> services = query.getResultList();
        return services;
    }
    
    //Tìm service đang phục vụ bằng keyword
    public List<Service> findServiceStillServingByKeyWord(String keyword) {
        String sql = "select * from tbl_services where lcase(concat(tbl_services.name,'',tbl_services.code,' ', tbl_services.price,' ', tbl_services.description)) LIKE LCASE('%" + keyword + "%')";
        sql = sql + " AND tbl_services.status =" + ConstantVariableCommon.STATUS_SERVICE_1;
        Query query = entityManager.createNativeQuery(sql, Service.class);
        List<Service> services = query.getResultList();
        return services;
    }
    
    //Tìm service ngưng phục vụ bằng keyword
    public List<Service> findServiceStopServingByKeyWord(String keyword) {
        String sql = "select * from tbl_services where lcase(concat(tbl_services.name,'',tbl_services.code,' ', tbl_services.price,' ', tbl_services.description)) LIKE LCASE('%" + keyword + "%')";
        sql = sql + " AND tbl_services.status =" + ConstantVariableCommon.STATUS_SERVICE_2;
        Query query = entityManager.createNativeQuery(sql, Service.class);
        List<Service> services = query.getResultList();
        return services;
    }
    
    public List<Service> findAllService() {
        String sql  = "select * from tbl_services where deleted_at is NULL or deleted_by is NULL";
        Query query = entityManager.createNativeQuery(sql, Service.class);
        return query.getResultList();
    }

    //Tim tat ca cac service
    public List<Service> findAllServiceExist(){
        String sql  = "select * from tbl_services where tbl_services.status !=" + ConstantVariableCommon.STATUS_SERVICE_3;
        Query query = entityManager.createNativeQuery(sql, Service.class);
        return query.getResultList();
    }

}

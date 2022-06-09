package com.sapo.dao.jpa;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.entities.Role;
import com.sapo.services.impl.RoleServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "RoleDao")
@Transactional(rollbackOn = Exception.class)
public class RoleDao {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(RoleServiceImpl.class.toString());

    //Hàm lấy list role đang sử dụng
    public List<Role> findAllRoleByStatus(){
        String sql = "SELECT * FROM tbl_roles WHERE status = " + ConstantVariableCommon.STATUS_ROLE_1; //deleted_at IS NULL or deleted_by IS NULL
        Query query = entityManager.createNativeQuery(sql, Role.class);
        return query.getResultList();
    }

    //Hàm tìm role bằng id
    public Role findRoleById(int id){
        String sql = "SELECT * FROM tbl_roles WHERE id = " + id; //deleted_at IS NULL or deleted_by IS NULL
        Query query = entityManager.createNativeQuery(sql, Role.class);
        Role role = (Role) query.getSingleResult();
        return role;
    }

    //Hàm lấy list chức vụ có keyword và trạng thái
    public List<Role> listUser(String keyword){
        String sql = "SELECT * FROM tbl_roles WHERE 1=1 ";
        if(keyword.length() != 0  && keyword != null){
            sql = sql +" AND LCASE(CONCAT(tbl_roles.name, ' ', tbl_roles.description)) LIKE LCASE('%" + keyword + "%')";
        }
        Query query = entityManager.createNativeQuery(sql, Role.class);
        return query.getResultList();
    }



}

package com.sapo.dao.jpa;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.entities.User;
import com.sapo.services.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "UserDAO")
@Transactional(rollbackOn = Exception.class)
public class UserDAO {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());

    //hàm tìm user bằng keyword
    public List<User> findUserByKeyword(String keyword, int status,  List<Integer> roleIds){
        String sql = "SELECT * FROM tbl_users,tbl_user_role where 1=1 ";
        if(keyword.length() != 0 && keyword != null){
            sql = sql +" AND LCASE(CONCAT(tbl_users.name, ' ', tbl_users.phone, ' ', tbl_users.username, ' ', tbl_users.code, ' ', tbl_users.email)) LIKE LCASE('%" + keyword + "%')";
        }
        if(status == 1){
            sql = sql + " AND (tbl_users.status =" +status + " OR tbl_users.status = " + ConstantVariableCommon.STATUS_USER_3 + " OR tbl_users.status = " + ConstantVariableCommon.STATUS_USER_4 +" ) ";
        }else{
            sql = sql + " AND (tbl_users.status =" +status + " ) ";
        }
        if(roleIds.size() > 0) {
            String sqlRole = " AND tbl_user_role.user_id = tbl_users.id AND ( ";
            String sqlRoleId = " ";
            System.out.println("role id :   "+roleIds);
            for (int i = 0; i< roleIds.size() ; i++){
                sqlRoleId = sqlRoleId + " role_id = " +roleIds.get(i) + " OR ";
        }
            sql = sql + sqlRole + sqlRoleId + " 1 = 2 )";
            System.out.println(sql);
        }
        Query query = entityManager.createNativeQuery(sql, User.class);
        List<User> users = query.getResultList();
        return users;
    }

    //Hàm tìm user vẫn đang đi làm
    public List<User> findAllUserExist(){
        String sql = "SELECT * FROM tbl_users"; //deleted_at IS NULL or deleted_by IS NULL
        Query query = entityManager.createNativeQuery(sql, User.class);
        return query.getResultList();
    }

    //Hàm tìm tất cả user vẫn đang làm
    public List<User> findAllUserWorking(){
        String sql = "SELECT * FROM tbl_users where  ( tbl_users.status = " + ConstantVariableCommon.STATUS_USER_3 +" OR tbl_users.status = " +ConstantVariableCommon.STATUS_USER_1 +" OR tbl_users.status = " +ConstantVariableCommon.STATUS_USER_1 +" ) "  ;
        Query query = entityManager.createNativeQuery(sql, User.class);
        return query.getResultList();
    }
    
    //Hàm tìm tất cả thợ sửa đang bận
    public List<User> findAllUserNotReadyFix(){
        String sql = "SELECT * FROM tbl_users where status = 3";
        Query query = entityManager.createNativeQuery(sql, User.class);
        return query.getResultList();
    }

    //Hàm tìm tất cả thợ sửa đang rảnh
    public List<User> findAllUserReadyFix(){
        String sql = "SELECT * FROM tbl_users where status = 4";
        Query query = entityManager.createNativeQuery(sql, User.class);
        return query.getResultList();
    }

    // Hàm tìm user bằng id
    public User findUserById(int id){
        String sql = "SELECT * FROM tbl_users where id = "+ id;
        Query query = entityManager.createNativeQuery(sql, User.class);
        return (User) query.getSingleResult();
    }
    
//    // Hàm tìm user bằng status
//    public List<User> findUserByStatus(int status){
//        String sql = "SELECT * FROM tbl_users where status = "+ status;
//        Query query = entityManager.createNativeQuery(sql, User.class);
//        return query.getResultList();
//    }

    //hàm deleteUserById
    @Transactional(rollbackOn = Exception.class)
    public void deleteUserById(int id){
       try {
           String sql = "DELETE FROM tbl_users where id = "+ id;
           Query query = entityManager.createNativeQuery(sql, User.class);
           query.executeUpdate();
       }catch (Exception e){
           LOGGER.error("ERROR: {} | delete user error", e);
       }
    }

    //Hàm TÌm user bằng username
    public User findUserByUsername(String username){
        String sql = "SELECT * FROM tbl_users where username = '"+ username +"'";
        Query query = entityManager.createNativeQuery(sql, User.class);
        return (User) query.getSingleResult();
    }

    //Hàm tìm danh sách thợ sửa đang rảnh
    public List<User> findAllUserReadyFix(int status, String keyword){
        String sql = "select * from tbl_users,tbl_user_role where tbl_users.status = " +status + " AND tbl_user_role.user_id = tbl_users.id AND tbl_user_role.role_id = " +ConstantVariableCommon.ROLE_ID_FIXER;
        if(keyword.length() != 0 && keyword != null){
            sql = sql + " AND LCASE(CONCAT(tbl_users.name, ' ', tbl_users.phone, ' ', tbl_users.username, ' ', tbl_users.code, ' ', tbl_users.email)) LIKE LCASE('%" + keyword + "%')";
        }
        Query query = entityManager.createNativeQuery(sql, User.class);
        return query.getResultList();
    }

}

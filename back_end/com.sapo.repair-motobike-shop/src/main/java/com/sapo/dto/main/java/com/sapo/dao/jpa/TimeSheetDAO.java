package com.sapo.dao.jpa;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.dto.timesheets.UserTimeSheetDTOGetByIdResponse;
import com.sapo.entities.Timesheet;
import com.sapo.services.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "TimeSheetDAO")
@Transactional(rollbackOn = Exception.class)
public class TimeSheetDAO {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());

    // Hàm tìm tất cả bảng công và search theo tên
    public List<Timesheet> findAllUserTimeSheet(String keyword, int month, String column, String sort){
        String sql = "SELECT * FROM tbl_timesheets JOIN tbl_users ON tbl_users.id = tbl_timesheets.user_id WHERE 1=1 " ;
        if(keyword != null && !keyword.isEmpty()){
            sql =  sql + "AND LCASE(CONCAT(tbl_users.name, ' ', tbl_users.phone, ' ',tbl_users.code)) LIKE LCASE('%"+keyword+"%')";
        }
        if(month > 0 && month < 13){
            sql = sql + "AND month =" +month;
        }else {
            sql = sql + "AND month = 1";
        }
        if(column != null && sort != null){
            sql = sql + " ORDER BY " + column +" " +sort;
        }

        Query query = entityManager.createNativeQuery(sql, Timesheet.class);
        List<Timesheet> timesheets = query.getResultList();
        return timesheets;
    }

    //hàm tìm theo tháng
    public List<Timesheet> findAllUserTimeSheetByMonth(int month){
        String sql = "SELECT * FROM tbl_timesheets WHERE month = " +month;
        Query query = entityManager.createNativeQuery(sql, Timesheet.class);
        List<Timesheet> timesheets = query.getResultList();
        return timesheets;
    }



    //Hàm tìm kiếm bảng công của từng người
    public Timesheet findAllUserTimeSheetById(int id){
        String sql = "SELECT * FROM tbl_timesheets where id='" +id +"'";
        Query query = entityManager.createNativeQuery(sql, Timesheet.class);
        return (Timesheet) query.getSingleResult();
    }

    // Hàm tìm kiếm bảng công theo user và id
    public UserTimeSheetDTOGetByIdResponse findTimesheetByUserAndId(int id){
        String sql = "SELECT * FROM tbl_timesheets JOIN tbl_users ON tbl_users.id = tbl_timesheets.user_id AND tbl_timesheets.id='" +id +"'";
        Query query = entityManager.createNativeQuery(sql);
        UserTimeSheetDTOGetByIdResponse userTimeSheetDTO = new UserTimeSheetDTOGetByIdResponse();
        try{
            userTimeSheetDTO = (UserTimeSheetDTOGetByIdResponse) query.getSingleResult();
        }catch (Exception e){
            LOGGER.error("ERROR: {} | find timesheet by id and user error", e);
        }
        return  userTimeSheetDTO ;
    }

    // Hàm tìm bảng công bằng id
    public Timesheet findTimeSheetById(int id){
        String sql = "SELECT * FROM tbl_timesheets WHERE id='" +id +"'";
        Query query = entityManager.createNativeQuery(sql, Timesheet.class);
        return  (Timesheet) query.getSingleResult() ;
    }

}

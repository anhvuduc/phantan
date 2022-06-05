//package com.sapo.dao.jdbc;
//
//
//import com.sapo.dto.statistics.StatisticsCustomerDTO;
//import org.springframework.jdbc.core.BeanPropertyRowMapper;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.support.JdbcDaoSupport;
//
//import javax.sql.DataSource;
//import java.util.List;
//
//public class StatisticsDAO extends JdbcDaoSupport {
//
//    private final JdbcTemplate jdbcTemplateObject;
//
//    public StatisticsDAO(DataSource dataSource, JdbcTemplate jdbcTemplateObject) {
//        this.jdbcTemplateObject = jdbcTemplateObject;
//        this.setDataSource(dataSource);
//    }
//
//    public List<StatisticsCustomerDTO> selectCustomerAndInvoicesInfo() {
//        String sql = "select customer_id,tbl_customers.code, tbl_customers.name,tbl_customers.phone,tbl_customers.license_plate,  sum(total) as total_purchased, count(customer_id) as number_purchases, tbl_invoices.created_at from tbl_invoices, tbl_customers where tbl_invoices.customer_id = tbl_customers.id group by tbl_invoices.customer_id";
//        List<StatisticsCustomerDTO> lists = jdbcTemplateObject.query(sql, new BeanPropertyRowMapper());
//        return lists;
//    }
//}

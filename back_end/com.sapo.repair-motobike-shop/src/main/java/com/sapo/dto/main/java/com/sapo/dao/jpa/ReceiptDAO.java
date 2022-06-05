package com.sapo.dao.jpa;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.entities.Receipt;
import com.sapo.entities.ReceiptMaterial;
import com.sapo.services.impl.ReceiptServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "ReceiptDAO")
@Transactional(rollbackOn = Exception.class)
public class ReceiptDAO {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(ReceiptServiceImpl.class.toString());

    //hàm tìm Receipt bằng keyword
    public List<Receipt> findReceiptByKeyword(String keyword){
        String sql = "SELECT * FROM tbl_receipts where 1=1 ";
        if(keyword != null && keyword.length() != 0){
            sql = sql + "LCASE(CONCAT(tbl_receipts.code)) LIKE LCASE('%" + keyword + "%') ";
        }
        Query query = entityManager.createNativeQuery(sql, Receipt.class);
        List<Receipt> receipts = query.getResultList();
        System.out.println(receipts.size());
        return receipts;
    }

    //Hàm tìm Receipt vẫn đang tồn tại
    public List<Receipt> findAllReceiptExist(){
        String sql = "SELECT * FROM tbl_receipts"; //deleted_at IS NULL or deleted_by IS NULL
        Query query = entityManager.createNativeQuery(sql, Receipt.class);
        return query.getResultList();
    }

    //Hàm tìm tất cả Receipt vẫn đang tồn tại
    public List<Receipt> findAllReceiptWorking(){
        String sql = "SELECT * FROM tbl_receipts where status = " + ConstantVariableCommon.STATUS_RECEIPT_1;
        Query query = entityManager.createNativeQuery(sql, Receipt.class);
        return query.getResultList();
    }

    // Hàm tìm Receipt bằng id
    public Receipt findReceiptById(int id){
        String sql = "SELECT * FROM tbl_receipts where id = "+ id;
        Query query = entityManager.createNativeQuery(sql, Receipt.class);
        return (Receipt) query.getSingleResult();
    }

    //hàm delete Receipt
    @Transactional(rollbackOn = Exception.class)
    public void deleteReceiptById(int id){
        try {
            String sql = "DELETE FROM tbl_receipts where id = "+ id;
            Query query = entityManager.createNativeQuery(sql, Receipt.class);
            query.executeUpdate();
        }catch (Exception e){
            LOGGER.error("ERROR: {} | delete receipt error", e);
        }
    }

    //Hàm tìm material receipt bằng id receipt
    public List<ReceiptMaterial> findReceiptMaterialByIdReceipt (int id){
        String sql = "SELECT * FROM tbl_receipt_material where receipt_id = " +id;
        Query query = entityManager.createNativeQuery(sql, ReceiptMaterial.class);
        return query.getResultList();
    }



}


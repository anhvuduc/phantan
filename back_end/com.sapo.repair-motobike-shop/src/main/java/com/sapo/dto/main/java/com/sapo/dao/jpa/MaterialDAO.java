package com.sapo.dao.jpa;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.entities.Material;
import com.sapo.services.impl.MaterialServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "MaterialDAO")
@Transactional(rollbackOn = Exception.class)
public class MaterialDAO {
    @PersistenceContext
    private EntityManager entityManager;
    private static final Logger LOGGER = LoggerFactory.getLogger(MaterialServiceImpl.class.toString());

    //Hàm tìm tất cả material đang sử dụng
    public List<Material> findAllMaterialUsing(String keyword) {
        String sql = "SELECT * FROM tbl_materials where status = " + ConstantVariableCommon.STATUS_MATERIAL_1;

        if(keyword.length() != 0 && keyword != null){
            sql = sql + " AND LCASE(CONCAT(tbl_materials.name, ' ', ' ', tbl_materials.description, ' ', tbl_materials.code, ' ', tbl_materials.supplier, ' ', tbl_materials.quantity, ' ', tbl_materials.output_price, ' ', tbl_materials.input_price)) LIKE LCASE('%" + keyword + "%')";
        }
        Query query = entityManager.createNativeQuery(sql, Material.class);
        List<Material> materials = query.getResultList();
        return materials;
    }

    //hàm tìm Material bằng keyword
    public List<Material> findMaterialByKeyword(String keyword, int status) {
        String sql = "SELECT * FROM tbl_materials where 1=1 ";
        if(keyword.length() != 0 && keyword != null){
            sql = sql + " AND LCASE(CONCAT(tbl_materials.name, ' ', ' ', tbl_materials.description, ' ', tbl_materials.code, ' ', tbl_materials.supplier, ' ', tbl_materials.quantity, ' ', tbl_materials.output_price, ' ', tbl_materials.input_price)) LIKE LCASE('%" + keyword + "%')";
        }
        if (status == 1 || status == 2) {
            sql = sql + " AND tbl_materials.status =" + status;
        }
        Query query = entityManager.createNativeQuery(sql, Material.class);
        List<Material> materials = query.getResultList();
        return materials;
    }

    //Hàm tìm materials tồn tại
    public List<Material> findAllMaterialExist() {
        String sql = "SELECT * FROM tbl_materials WHERE tbl_materials.status != " + ConstantVariableCommon.STATUS_MATERIAL_3; //deleted_at IS NULL or deleted_by IS NULL
        Query query = entityManager.createNativeQuery(sql, Material.class);
        return query.getResultList();
    }

    //Hàm tìm tất cả Material tồn tại
    public List<Material> findAllMaterialWorking() {
        String sql = "SELECT * FROM tbl_materials where status = 1";
        Query query = entityManager.createNativeQuery(sql, Material.class);
        return query.getResultList();
    }

    // Hàm tìm Material bằng id
    public Material findMaterialById(int id) {
        String sql = "SELECT * FROM tbl_materials where id = " + id;
        Query query = entityManager.createNativeQuery(sql, Material.class);
        return (Material) query.getSingleResult();
    }

}

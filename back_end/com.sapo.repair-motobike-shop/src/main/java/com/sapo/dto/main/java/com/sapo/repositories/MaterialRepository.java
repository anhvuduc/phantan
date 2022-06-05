package com.sapo.repositories;

import com.sapo.entities.Material;
import com.sapo.entities.MaterialOrder;
import com.sapo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Integer>, JpaSpecificationExecutor<MaterialOrder> {
  @Query(value = "select tbl_materials.* from tbl_materials where tbl_materials.id = ?", nativeQuery = true)
  Material findMaterialById(int id);
}

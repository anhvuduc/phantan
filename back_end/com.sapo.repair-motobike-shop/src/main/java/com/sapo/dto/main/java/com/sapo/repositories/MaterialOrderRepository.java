package com.sapo.repositories;


import com.sapo.entities.Material;
import com.sapo.entities.MaterialOrder;
import com.sapo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialOrderRepository extends JpaRepository<MaterialOrder, Integer> {
  @Query(value = "select tbl_material_order.* from tbl_material_order where tbl_material_order.id = ?", nativeQuery = true)
  MaterialOrder findMaterialOrderById(int id);
}

package com.sapo.repositories;

import com.sapo.entities.ReceiptMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceiptMaterialRepository extends JpaRepository<ReceiptMaterial,Integer> {
}

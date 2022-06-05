package com.sapo.controllers.staff;


import com.sapo.entities.Material;
import com.sapo.services.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/materials")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('COORDINATOR')" )
public class MaterialController {
    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    //API lấy list phụ kiện
    @GetMapping
    public ResponseEntity<List<Material>> listMaterial(@RequestParam String keyword){
        List<Material> materials = materialService.findAllMaterialUsing(keyword);
        return ResponseEntity.ok(materials);
    }
}

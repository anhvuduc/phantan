package com.sapo.controllers.admin;

import com.sapo.dto.materials.*;
import com.sapo.entities.Material;
import com.sapo.services.MaterialService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RequestMapping("/api/admin/materials")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN')")
public class AdminMaterialsController {
    private final MaterialService materialService;

    public AdminMaterialsController(MaterialService materialService) {
        this.materialService = materialService;
    }


    //API lấy list phụ kiện
    @GetMapping
    public ResponseEntity<List<Material>> listMaterial(){
        List<Material> materials = materialService.findAllMaterialUsing("");
        return ResponseEntity.ok(materials);
    }


    // API Tạo Material
    @PostMapping
    public ResponseEntity<MaterialDTORequest> addMaterial(@Valid @RequestBody MaterialDTORequest material) throws IOException {
        materialService.saveMaterial(material);
        return ResponseEntity.ok(material);
    }


    // API Tìm tất cả Material và phân trang
    @GetMapping("/list")
    public ResponseEntity<MaterialPaginationDTO> listMaterial(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword, @RequestParam int status){
        MaterialPaginationDTO material = materialService.searchMaterial(page, limit, keyword, status);
        return ResponseEntity.ok(material);
    }

    //API Tìm Thông tin Material bằng id
    @GetMapping("/{id}")
    public ResponseEntity<Material> findMaterialById(@PathVariable("id") int id){
        Material material = materialService.findMaterialById(id);
        return ResponseEntity.ok(material);
    }

    // API Update Material
    @PutMapping("/{id}")
    public ResponseEntity<MaterialDTOUpdateRequest> updateMaterial(@PathVariable("id") int id, @Valid @RequestBody MaterialDTOUpdateRequest materialDTOUpdateRequest) {
        materialService.updateMaterial(id, materialDTOUpdateRequest);
        return ResponseEntity.ok(materialDTOUpdateRequest);
    }

    //API đổi trạng thái material
    @PutMapping("/{id}/status")
    public ResponseEntity<MaterialDTOResponse> changeStatusMaterial(@PathVariable int id){
        MaterialDTOResponse materialDTOResponse = materialService.changeStatusMaterial(id);
        return ResponseEntity.ok(materialDTOResponse);
    }

    // Xóa material
    @PutMapping("/delete/{id}")
    public ResponseEntity<MaterialDTOResponse> deleteMaterial(@PathVariable("id") int id){
        MaterialDTOResponse materialDTOResponse = materialService.deleteMaterial(id);
        return ResponseEntity.ok(materialDTOResponse);
    }

    @PostMapping("/uploadFile/{id}")
    public ResponseEntity<MultipartFile> uploadFile(@PathVariable("id") int id , @RequestParam("file") MultipartFile file) throws IOException {
        materialService.saveImage(id,file);
        return  ResponseEntity.ok(file);
    }

    // API Tạo Material
    @PostMapping("/receipt")
    public ResponseEntity<Void> addMaterial(@Valid @RequestBody MaterialNewDTO material){
        materialService.saveMaterialInReceipt(material);
        return ResponseEntity.ok().build();
    }

}

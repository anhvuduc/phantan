package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.MaterialDAO;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.materials.*;
import com.sapo.entities.Material;
import com.sapo.repositories.MaterialRepository;
import com.sapo.services.MaterialService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {
    private final MaterialDAO materialDAO;
    private final MaterialRepository materialRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(MaterialServiceImpl.class.toString());

    public MaterialServiceImpl(MaterialDAO materialDAO, MaterialRepository materialRepository) {
        this.materialDAO = materialDAO;
        this.materialRepository = materialRepository;
    }

    //hàm tìm tất cả phụ kiện đang sử dụng
    @Override
    public List<Material> findAllMaterialUsing(String keyword){
        List<Material> materials = materialDAO.findAllMaterialUsing(keyword);
        return materials;
    }


    // tạo material mới phụ tùng
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveMaterial(MaterialDTORequest materialDTO){
        Material material = new Material();
        material.setCode(Common.GenerateCodeMaterial());
        material.setName(materialDTO.getName());
        material.setDescription(materialDTO.getDescription());
        material.setQuantity(materialDTO.getQuantity());
        material.setSupplier(materialDTO.getSupplier());
        material.setOutputPrice(materialDTO.getInputPrice());
        material.setInputPrice(materialDTO.getOutputPrice());
        material.setStatus(ConstantVariableCommon.STATUS_MATERIAL_1);
        material.setCreatedAt();
        saveMaterialRepository(material);
    }

    // Hàm lưu Image
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveImage(int id, MultipartFile image) throws IOException {
        Material material = materialDAO.findMaterialById(id);
        if (!isEmptyUploadFile(image)){
            new File(Common.getImageMaterialAddress()+"/upload/images/"
                    + material.getImage()).delete();
            image.transferTo(
                    new File(Common.getImageMaterialAddress()+"/upload/images/"
                            + image.getOriginalFilename()));
        }else {
            material.setImage(material.getImage());
        }
        material.setImage(image.getOriginalFilename());
        material.setUpdatedAt();
        saveMaterialRepository(material);
    }

    //Hàm lưu material bằng materialRepository
    private void saveMaterialRepository(Material material){
        try{
            materialRepository.save(material);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Save material", material);
        }
    }
    //Hàm kiểm tra input avatar
    private boolean isEmptyUploadFile(MultipartFile path) {
        if (path == null || path.isEmpty() == true)
            return true;
        return false;
    }


    //Hàm tìm Material bằng id
    @Override
    public Material findMaterialById(int id){
        Material material = materialDAO.findMaterialById(id);
        return material;
    }

    // cập nhật Material
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateMaterial(int id, MaterialDTOUpdateRequest materialDTOUpdateRequest) {
        Material material = findMaterialById(id);
        if(materialDTOUpdateRequest.getName() != null){
            material.setName(materialDTOUpdateRequest.getName());
        }

        if(materialDTOUpdateRequest.getDescription() != null){
            material.setDescription(materialDTOUpdateRequest.getDescription());
        }
        if(materialDTOUpdateRequest.getQuantity() != null){
            material.setQuantity(materialDTOUpdateRequest.getQuantity());
        }
        if(materialDTOUpdateRequest.getSupplier() != null){
            material.setSupplier(materialDTOUpdateRequest.getSupplier());
        }
        if(materialDTOUpdateRequest.getInputPrice() != null){
            material.setInputPrice(materialDTOUpdateRequest.getInputPrice());
        }
        if(materialDTOUpdateRequest.getOutputPrice() != null){
            material.setOutputPrice(materialDTOUpdateRequest.getOutputPrice());
        }
        material.setUpdatedAt();
        saveMaterialRepository(material);
    }
    
    //Hàm chuyển trạng thái material
    @Override
    public MaterialDTOResponse changeStatusMaterial(int id){
        Material material = materialDAO.findMaterialById(id);
        if(material.getStatus() == 1){
            material.setStatus(ConstantVariableCommon.STATUS_MATERIAL_2);
        }else {
            material.setStatus(ConstantVariableCommon.STATUS_MATERIAL_1);
        }
        saveMaterialRepository(material);
        MaterialDTOResponse materialDTOResponse = new MaterialDTOResponse(material.getId(), material.getCode(),material.getName(), material.getDescription(),material.getQuantity(),material.getSupplier(), Common.getStringPriceVNBigDecimal(material.getInputPrice()), Common.getStringPriceVNBigDecimal(material.getOutputPrice()), ConstantVariableCommon.statusMaterialIntToString(material.getStatus()));
        return materialDTOResponse;
    }

    //Hàm search Material
    @Override
    public MaterialPaginationDTO searchMaterial(int page, int limit, String keyword, int status){
        MaterialPaginationDTO materialPaginationDTO = new MaterialPaginationDTO();
        System.out.println("Status "+status);
        List<Material> materials = materialDAO.findMaterialByKeyword(keyword, status);
        materialPaginationDTO = findAllMaterialDTO(page, limit, materials);
        return materialPaginationDTO;
    }

    // Chuyển Material sang MaterialDTO
    private MaterialPaginationDTO findAllMaterialDTO(int page, int limit, List<Material> materials){
        List<MaterialDTOResponse> materialDTOS = transferMaterialToMaterialDTO(materials);
        MaterialPaginationDTO materialDTOsPagination = findAllMaterialPaginationDTO(page,  limit, materialDTOS);
        return materialDTOsPagination;
    }

    //Hàm xóa material
    @Override
    public MaterialDTOResponse deleteMaterial(int id){
        Material material = materialDAO.findMaterialById(id);
        material.setStatus(ConstantVariableCommon.STATUS_MATERIAL_3);
        material.setDeletedAt();
        saveMaterialRepository(material);
        MaterialDTOResponse materialDTOResponse = new MaterialDTOResponse(material.getId(), material.getCode(),material.getName(), material.getDescription(),material.getQuantity(),material.getSupplier(), Common.getStringPriceVNBigDecimal(material.getInputPrice()), Common.getStringPriceVNBigDecimal(material.getOutputPrice()), ConstantVariableCommon.statusMaterialIntToString(material.getStatus()));
        return materialDTOResponse;
    }

    // Chuyển Material sang MaterialDTO
    private List<MaterialDTOResponse> transferMaterialToMaterialDTO(List<Material> materials){
        List<MaterialDTOResponse> materialDTOS = new ArrayList<>();
        materials.forEach(material -> {
            MaterialDTOResponse materialDTO = new MaterialDTOResponse(material.getId(), material.getCode(),material.getName(), material.getDescription(),material.getQuantity(),material.getSupplier(), Common.getStringPriceVNBigDecimal(material.getInputPrice()), Common.getStringPriceVNBigDecimal(material.getOutputPrice()), ConstantVariableCommon.statusMaterialIntToString(material.getStatus()));
            materialDTOS.add(materialDTO);
        });
        return materialDTOS;
    }

    //Hàm phân trang
    private MaterialPaginationDTO findAllMaterialPaginationDTO (int page, int limit, List<MaterialDTOResponse> materialDTOS){
        List<MaterialDTOResponse> materialDTOList = new ArrayList<MaterialDTOResponse>();
        if ((materialDTOS.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                materialDTOList.add(materialDTOS.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < materialDTOS.size(); i++) {
                materialDTOList.add(materialDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, materialDTOS.size());
        MaterialPaginationDTO materialPaginationDTO = new MaterialPaginationDTO(materialDTOList, pagination);
        return materialPaginationDTO;
    }

    //Hàm tạo mới phụ kiện ở phiếu nhận
    @Override
    public void saveMaterialInReceipt (MaterialNewDTO materialNewDTO){
        Material material = new Material();
        material.setQuantity(ConstantVariableCommon.QUANTITY_MATERIAL_DEFAULT);
        material.setStatus(ConstantVariableCommon.STATUS_MATERIAL_1);
        material.setDescription(materialNewDTO.getDescription());
        material.setInputPrice(materialNewDTO.getInputPrice());
        material.setOutputPrice(materialNewDTO.getOutputPrice());
        material.setName(materialNewDTO.getName());
        material.setImage(null);
        material.setCreatedAt();
        material.setCode(Common.GenerateCodeMaterial());

        saveMaterialRepository(material);
    }
}

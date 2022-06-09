package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.MaterialDAO;
import com.sapo.dao.jpa.ReceiptDAO;
import com.sapo.dto.invoices.InvoiceAddRequestDTO;
import com.sapo.dto.invoices.InvoiceMaterialOrderRequestDTO;
import com.sapo.dto.receipts.*;
import com.sapo.entities.*;
import com.sapo.exception.InputException;
import com.sapo.repositories.MaterialRepository;
import com.sapo.repositories.ReceiptMaterialRepository;
import com.sapo.repositories.ReceiptRepository;
import com.sapo.services.ReceiptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiptServiceImpl implements ReceiptService {
    private final ReceiptRepository receiptRepository;
    private final ReceiptDAO receiptDAO;
    private final ReceiptMaterialRepository receiptMaterialRepository;
    private final MaterialRepository materialRepository;
    private final MaterialDAO materialDAO;
    
    private static final Logger LOGGER = LoggerFactory.getLogger(ReceiptServiceImpl.class.toString());

    public ReceiptServiceImpl(ReceiptRepository receiptRepository, ReceiptDAO receiptDAO, ReceiptMaterialRepository receiptMaterialRepository, MaterialRepository materialRepository, MaterialDAO materialDAO) {
        this.receiptRepository = receiptRepository;
        this.receiptDAO = receiptDAO;
        this.receiptMaterialRepository = receiptMaterialRepository;
        this.materialRepository = materialRepository;
        this.materialDAO = materialDAO;
    }
    //Hàm tìm receipt bằng id
    @Override
    public Receipt findReceiptById(int id){
        Receipt receipt = receiptDAO.findReceiptById(id);
        return receipt;
    }
    //Hàm search receipt
    @Override
    public ReceiptPaginationDTO searchReceipt(int page, int limit, String keyword){
        List<Receipt> receipts = receiptDAO.findReceiptByKeyword(keyword);
        ReceiptPaginationDTO receiptDTOsPagination = findAllReceiptDTO(page, limit, receipts);
        return receiptDTOsPagination;
    }

    // tạo receipt mới
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveReceipt(ReceiptDTORequest receiptDTO){
        if(receiptDTO.getMaterialDTOS().size() > 0){
            Receipt receipt = new Receipt();
            receipt.setCode(Common.GenerateCodeReceipt());
            receipt.setCreatedAt();
            receipt.setNote(receiptDTO.getNote());
            receipt.setStatus(ConstantVariableCommon.STATUS_RECEIPT_1);
            addReceiptMaterial(receiptDTO.getMaterialDTOS(), receipt);
            saveReceiptRepository(receipt);
        }else {
            throw new InputException("Không có phụ tùng để tạo phiếu");
        }
    }

    //hàm thêm material trong receipt
    private void addReceiptMaterial(List<MaterialInputRequestDTO> materialDTOS, Receipt receipt) {
        List<ReceiptMaterial> receiptMaterials = new ArrayList<>();
        for (int i = 0; i < materialDTOS.size(); i++) {
            ReceiptMaterial receiptMaterial = new ReceiptMaterial();
            receiptMaterial.setMaterialId(materialDTOS.get(i).getId());
            receiptMaterial.setQuantity(materialDTOS.get(i).getQuantity());
            receiptMaterial.setCode(Common.GenerateCodeReceiptMaterial());
            receiptMaterial.setReceipt(receipt);
            receiptMaterial.setCreatedAt();
            receiptMaterials.add(receiptMaterial);
            //Sửa quantity trong material
            editMaterial(materialDTOS.get(i));
        }
        saveReceiptMaterial(receiptMaterials);
    }
    //Hàm sửa số lượng trong material
    void editMaterial (MaterialInputRequestDTO materialDTO){
        Material material = materialDAO.findMaterialById(materialDTO.getId());
        material.setQuantity(material.getQuantity() + materialDTO.getQuantity());
        saveMaterialRepository(material);
    }
    

    //Hàm chuyển trạng thái
    public ReceiptDTOResponse changeStatusReceipt(int id){
        Receipt receipt = receiptDAO.findReceiptById(id);
        if(receipt.getStatus() == 1){
            receipt.setStatus(ConstantVariableCommon.STATUS_RECEIPT_2);
        }else {
            receipt.setStatus(ConstantVariableCommon.STATUS_RECEIPT_1);
        }
        saveReceiptRepository(receipt);
        ReceiptDTOResponse receiptDTOResponse = new ReceiptDTOResponse(receipt.getId(), receipt.getCode(), Common.getDateByMilliSeconds(receipt.getCreatedAt()),ConstantVariableCommon.statusReceiptIntToString(receipt.getStatus()));
        return receiptDTOResponse;
    }

    //Hàm xóa receipt
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteReceipt(int id){
        receiptDAO.deleteReceiptById(id);
    }
    
    // Chuyển receipt sang ReceiptDTO
    private List<ReceiptDTOResponse> transferReceiptToReceiptDTO(List<Receipt> receipts){
        List<ReceiptDTOResponse> receiptDTOS = new ArrayList<>();
        receipts.forEach(receipt -> {
            ViewReceiptDTOResponse viewReceiptDTOResponse = findReceiptDetailById(receipt.getId());
            ReceiptDTOResponse receiptDTO = new ReceiptDTOResponse(receipt.getId(), receipt.getCode(),Common.getDateByMilliSeconds(receipt.getCreatedAt()), ConstantVariableCommon.statusReceiptIntToString(receipt.getStatus()), viewReceiptDTOResponse.getTotal());
            receiptDTOS.add(receiptDTO);
        });
        return receiptDTOS;
    }
    
    //Hàm chuyển receipt sang receiptDTO
    private ReceiptPaginationDTO findAllReceiptDTO(int page, int limit, List<Receipt> receipts){
        List<ReceiptDTOResponse> receiptDTOResponses = transferReceiptToReceiptDTO(receipts);
        ReceiptPaginationDTO receiptPaginationDTO = findAllReceiptPaginationDTO(page, limit, receiptDTOResponses);
        return receiptPaginationDTO;
    }

    //Hàm phân trang
    private ReceiptPaginationDTO findAllReceiptPaginationDTO (int page, int limit, List<ReceiptDTOResponse> receiptDTOS){
        List<ReceiptDTOResponse> receiptDTOList = new ArrayList<ReceiptDTOResponse>();
        if ((receiptDTOS.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                receiptDTOList.add(receiptDTOS.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < receiptDTOS.size(); i++) {
                receiptDTOList.add(receiptDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, receiptDTOS.size());
        ReceiptPaginationDTO receiptPaginationDTO = new ReceiptPaginationDTO(receiptDTOList, pagination);
        return receiptPaginationDTO;
    }


    //Hàm lưu receipt bằng ReceiptRepository
    private void saveReceiptRepository(Receipt receipt){
        try{
            receiptRepository.save(receipt);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Save receipt", receipt);
        }
    }
    
    //Lưu material trong receipt bằng repository
    @Transactional(rollbackOn = Exception.class)
    void saveReceiptMaterial(List<ReceiptMaterial> receiptMaterial){
        try{
            receiptMaterialRepository.saveAll(receiptMaterial);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Lỗi không lưu được phụ kiện", e);
        }
    }

    //Hàm lưu material bằng MaterialRepository
    private void saveMaterialRepository(Material material){
        try{
            materialRepository.save(material);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Save material", material);
        }
    }

    @Override
    public ViewReceiptDTOResponse findReceiptDetailById(int id){
        Receipt receipt = receiptDAO.findReceiptById(id);
        List<ReceiptMaterial> receiptMaterials = receiptDAO.findReceiptMaterialByIdReceipt(id);
        ViewReceiptDTOResponse receiptDTO = new ViewReceiptDTOResponse();

        //Thông tin hóa đơn
        receiptDTO.setCode(receipt.getCode());
        receiptDTO.setId(receipt.getId());
        receiptDTO.setCreateDate(Common.getDateByMilliSeconds(receipt.getCreatedAt()));
        receiptDTO.setNote(receipt.getNote());

        List<ReceiptMaterialResponseDTO> receiptDTOs = new ArrayList<>();
        BigDecimal total = new BigDecimal(0);
        for(int i =0; i<receiptMaterials.size() ; i++){
            BigDecimal quantity = new BigDecimal(receiptMaterials.get(i).getQuantity());
            Material material = materialDAO.findMaterialById(receiptMaterials.get(i).getMaterialId());
            BigDecimal sum = quantity.multiply(material.getInputPrice());
            total = total.add(sum);

            ReceiptMaterialResponseDTO receiptMaterialDTO = new ReceiptMaterialResponseDTO(receiptMaterials.get(i).getMaterialId(), material.getName(), material.getCode(),receiptMaterials.get(i).getQuantity(), Common.getStringPriceVNBigDecimal(material.getInputPrice()) );
            receiptDTOs.add(receiptMaterialDTO);
        }
        receiptDTO.setReceiptMaterialResponseDTOs(receiptDTOs);
        receiptDTO.setTotal(Common.getStringPriceVNBigDecimal(total));

        return receiptDTO;
    }
    
}

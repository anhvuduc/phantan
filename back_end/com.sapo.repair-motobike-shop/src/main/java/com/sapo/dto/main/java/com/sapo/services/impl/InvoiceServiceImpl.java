package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.*;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.invoices.*;
import com.sapo.entities.*;
import com.sapo.exception.InputException;
import com.sapo.repositories.*;
import com.sapo.services.InvoiceService;
import com.sapo.validate.InvoiceValidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceDAO invoiceDAO;
    private final MaterialDAO materialDAO;
    private final ServiceDAO serviceDAO;
    private final CustomerDAO customerDAO;
    private final UserRepository userRepository;
    private final UserDAO userDAO;
    private final InvoiceRepository invoiceRepository;
    private final MaterialOrderRepository materialOrderRepository;
    private final ServiceOrderRepository serviceOrderRepository;
    private final MaterialRepository materialRepository;
    private final VehicleDAO vehicleDAO;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class.toString());
    
    public InvoiceServiceImpl(InvoiceDAO invoiceDAO, MaterialDAO materialDAO, ServiceDAO serviceDAO, CustomerDAO customerDAO, UserRepository userRepository, UserDAO userDAO, InvoiceRepository invoiceRepository, MaterialOrderRepository materialOrderRepository, ServiceOrderRepository serviceOrderRepository, MaterialRepository materialRepository, VehicleDAO vehicleDAO) {
        this.invoiceDAO = invoiceDAO;
        this.materialDAO = materialDAO;
        this.serviceDAO = serviceDAO;
        this.customerDAO = customerDAO;
        this.userRepository = userRepository;
        this.userDAO = userDAO;
        this.invoiceRepository = invoiceRepository;
        this.materialOrderRepository = materialOrderRepository;
        this.serviceOrderRepository = serviceOrderRepository;
        this.materialRepository = materialRepository;
        this.vehicleDAO = vehicleDAO;
    }
    
    //Hàm lấy list hóa đơn theo trạng thái
    @Override
    public InvoiceListPaginationResponseDTO findAllInvoiceByStatus(int page, int limit, String keyword,List<Integer> status, int sort){
        String sortString = null;
        if(sort == 1) {
            sortString = "ASC";
        }else if(sort ==2){
            sortString = "DESC";
        }else{
            sortString = null;
        }
        List<Invoice> invoices = invoiceDAO.findAllInvoiceByStatusAndKeyword(keyword, status, sortString);

        InvoiceListPaginationResponseDTO invoiceListPaginationResponseDTO = paginationListInvoice(page, limit, invoices);
        return invoiceListPaginationResponseDTO;
    }

    //Hàm lấy list hóa đơn theo trạng thái
    @Override
    public InvoiceMaterialPaginationResponseDTO findAllInvoiceAndBuyMaterialByStatus(int page, int limit, String keyword,List<Integer> status, int sort){
        String sortString = null;
        if(sort == 1) {
            sortString = "ASC";
        }else if(sort ==2){
            sortString = "DESC";
        }else{
            sortString = null;
        }
        List<Invoice> invoices = invoiceDAO.findAllInvoiceByStatusAndKeyword(keyword, status, sortString);
        List<Invoice> invoicesBuyMaterial = invoiceDAO.findAllInvoiceBuyMaterial(keyword, status);
        List<Invoice> invoiceList = new ArrayList<>();
        for (Invoice invoice: invoices){
            invoiceList.add(invoice);
        }
        for (Invoice invoice: invoicesBuyMaterial){
            invoiceList.add(invoice);
        }
        InvoiceMaterialPaginationResponseDTO invoiceListPaginationResponseDTO = paginationListInvoiceMaterial(page, limit, invoiceList);
        return invoiceListPaginationResponseDTO;
    }

    //Hàm chuyển invoice sang invoiceDTO
    private InvoiceMaterialPaginationResponseDTO paginationListInvoiceMaterial(int page, int limit, List<Invoice> invoices){
        List<InvoiceMaterialResponseDTO> invoiceListResponseDTOS = transferInvoiceToInvoiceMaterialDTO(invoices);
        InvoiceMaterialPaginationResponseDTO invoiceMaterialPaginationResponseDTO = paginationInvoiceMaterialDTO(page, limit, invoiceListResponseDTOS);
        return invoiceMaterialPaginationResponseDTO;
    }
    //Hàm phân trang Invoice
    private InvoiceMaterialPaginationResponseDTO paginationInvoiceMaterialDTO(int page, int limit, List<InvoiceMaterialResponseDTO> invoiceListResponseDTOS ){
        List<InvoiceMaterialResponseDTO> invoiceListDTOS = new ArrayList<>();
        if ((invoiceListResponseDTOS.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                invoiceListDTOS.add(invoiceListResponseDTOS.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < invoiceListResponseDTOS.size(); i++) {
                invoiceListDTOS.add(invoiceListResponseDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, invoiceListResponseDTOS.size());
        InvoiceMaterialPaginationResponseDTO invoiceListPaginationResponseDTO = new InvoiceMaterialPaginationResponseDTO(invoiceListDTOS, pagination);
        return invoiceListPaginationResponseDTO;
    }

    //Hàm chuyển từ invoice sang invoiceDTO
    private List<InvoiceMaterialResponseDTO>  transferInvoiceToInvoiceMaterialDTO(List<Invoice> invoices){
        List<InvoiceMaterialResponseDTO> invoiceListResponseDTOS = new ArrayList<>();
        for (Invoice invoice: invoices){

            Customer customer = customerDAO.findCustomerById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getCustomerId());
            if(invoice.getFixerId() ==null ){
                if(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId() == null){
                    InvoiceMaterialResponseDTO invoiceResponseDTO = new InvoiceMaterialResponseDTO(invoice.getId(), invoice.getCode(), "","", customer.getName(), customer.getPhone(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                    invoiceListResponseDTOS.add(invoiceResponseDTO);
                }else {
                    Vehicle vehicle = vehicleDAO.findVehicleById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId());
                    InvoiceMaterialResponseDTO invoiceResponseDTO = new InvoiceMaterialResponseDTO(invoice.getId(), invoice.getCode(), vehicle.getLicensePlate(),"", customer.getName(), customer.getPhone(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                    invoiceListResponseDTOS.add(invoiceResponseDTO);
                }

            }else{
                Vehicle vehicle = vehicleDAO.findVehicleById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId());
                User user = userDAO.findUserById(invoice.getFixerId());
                InvoiceMaterialResponseDTO invoiceResponseDTO = new InvoiceMaterialResponseDTO(invoice.getId(), invoice.getCode(),vehicle.getLicensePlate(),user.getName(), customer.getName(), customer.getPhone(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                invoiceListResponseDTOS.add(invoiceResponseDTO);
            }

        }
        return invoiceListResponseDTOS;
    }

    //Hàm lấy list hóa đơn theo đang xử lý
    @Override
    public InvoiceListPaginationResponseDTO findAllInvoiceInProcess(int page, int limit, String keyword){
        List<Invoice> invoices = invoiceDAO.findAllInvoiceInProcessByKeyword(keyword);

        InvoiceListPaginationResponseDTO invoiceListPaginationResponseDTO = paginationListInvoice(page, limit, invoices);
        return invoiceListPaginationResponseDTO;
    }
    
    //Hàm lấy list hóa đơn có thể xóa (status = 1,2,7)
    @Override
    public InvoiceListPaginationResponseDTO findAllInvoiceCanDelete(int page, int limit, String keyword){
        List<Invoice> invoices = invoiceDAO.findAllInvoiceCanDelete(keyword);
        
        InvoiceListPaginationResponseDTO invoiceListPaginationResponseDTO = paginationListInvoice(page, limit, invoices);
        return invoiceListPaginationResponseDTO;
    }
    
    //Hàm chuyển trạng thái , note , paymethod
    @Override
    public void changeStatusInvoice(int id, int status, InvoiceAddRequestDTO invoiceAddRequestDTO){
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        invoice.setStatus(status);
        invoice.setUpdatedAt();
        if (invoiceAddRequestDTO.getNote() != null){
            invoice.setNote(invoiceAddRequestDTO.getNote());
        }
        if (invoiceAddRequestDTO.getPayMethod() != 0){
            invoice.setPayMethod(invoiceAddRequestDTO.getPayMethod());
        }

        if(invoiceAddRequestDTO.getFixerId() != 0){
            User user = userDAO.findUserById(invoiceAddRequestDTO.getFixerId());
            user.setStatus(ConstantVariableCommon.STATUS_USER_4);
            userRepository.save(user);
        }
        
        invoice.setTotal(invoiceAddRequestDTO.getTotal());
        saveInvoiceRepo(invoice);

    }
    
    
    //Hàm chuyển trạng thái
    @Override
    public InvoiceResponseDTO changeStatusInvoice(int id){
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_4);
        saveInvoiceRepo(invoice);
        InvoiceResponseDTO invoiceResponseDTO = new InvoiceResponseDTO(invoice.getId(), invoice.getCode(), vehicleDAO.findVehicleById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId()).getLicensePlate(), userDAO.findUserById(invoice.getFixerId()).getName(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
        return invoiceResponseDTO;
    }
    
    
    //Hàm chuyển invoice sang invoiceDTO
    private InvoiceListPaginationResponseDTO paginationListInvoice(int page, int limit, List<Invoice> invoices){
        List<InvoiceResponseDTO> invoiceListResponseDTOS = transferInvoiceToInvoiceDTO(invoices);
        InvoiceListPaginationResponseDTO invoiceListPaginationResponseDTO = paginationInvoiceDTO(page, limit, invoiceListResponseDTOS);
        return invoiceListPaginationResponseDTO;
    }
    
    //Hàm chuyển từ invoice sang invoiceDTO
    private List<InvoiceResponseDTO>  transferInvoiceToInvoiceDTO(List<Invoice> invoices){
        List<InvoiceResponseDTO> invoiceListResponseDTOS = new ArrayList<>();
        for (Invoice invoice: invoices){
            System.out.println("Fixer id : " +invoice.getFixerId());
            Vehicle vehicle = vehicleDAO.findVehicleById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId());
            if(invoice.getFixerId() == null || invoice.getFixerId() ==0 ){
                InvoiceResponseDTO invoiceResponseDTO = new InvoiceResponseDTO(invoice.getId(), invoice.getCode(), vehicle.getLicensePlate() , "", ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                invoiceListResponseDTOS.add(invoiceResponseDTO);
            }else{
                InvoiceResponseDTO invoiceResponseDTO = new InvoiceResponseDTO(invoice.getId(), invoice.getCode(), vehicle.getLicensePlate(), userDAO.findUserById(invoice.getFixerId()).getName(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                invoiceListResponseDTOS.add(invoiceResponseDTO);
            }
        }
        return invoiceListResponseDTOS;
    }
    
    //Hàm phân trang Invoice
    private InvoiceListPaginationResponseDTO paginationInvoiceDTO(int page, int limit, List<InvoiceResponseDTO> invoiceListResponseDTOS ){
        List<InvoiceResponseDTO> invoiceListDTOS = new ArrayList<InvoiceResponseDTO>();
        if ((invoiceListResponseDTOS.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                invoiceListDTOS.add(invoiceListResponseDTOS.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < invoiceListResponseDTOS.size(); i++) {
                invoiceListDTOS.add(invoiceListResponseDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, invoiceListResponseDTOS.size());
        InvoiceListPaginationResponseDTO invoiceListPaginationResponseDTO = new InvoiceListPaginationResponseDTO(invoiceListDTOS, pagination);
        return invoiceListPaginationResponseDTO;
    }
    
    //Tạo hóa đơn mới
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveInvoice(InvoiceAddRequestDTO invoiceAddRequestDTO){
        Invoice invoice = new Invoice();
        VehicleCustomer vehicleCustomer = vehicleDAO.findVehicleCustomerByIdVehicleAndIdCustomer(invoiceAddRequestDTO.getCustomerId(), invoiceAddRequestDTO.getVehicleId());
        invoice.setVehicleCustomerId(vehicleCustomer.getId());
        for(InvoiceMaterialOrderRequestDTO materialDTO:   invoiceAddRequestDTO.getMaterialDTOS()){
            checkQuantity(materialDTO.getId(), materialDTO.getQuantity());
        }

        invoice.setCreatedAt();
        if (invoiceAddRequestDTO.getFixerId() == null){
            invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_1);
            invoice.setFixerId(null);
        } else {
            invoice.setFixerId(invoiceAddRequestDTO.getFixerId());
            invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_2);
        }
        
        invoice.setNote(invoiceAddRequestDTO.getNote());
        invoice.setCode(Common.GenerateCodeInvoice());
        invoice.setPayMethod(invoiceAddRequestDTO.getPayMethod());
        saveInvoiceRepo(invoice);
        if(invoiceAddRequestDTO.getMaterialDTOS().size() > 0){
            addMaterialOrder(invoiceAddRequestDTO, invoice);
        }
        if(invoiceAddRequestDTO.getServiceDTOS().size() > 0 ){
            addServiceOrder(invoiceAddRequestDTO, invoice);
        }
        if(invoiceAddRequestDTO.getFixerId() > 0){
            saveStatusUser(invoiceAddRequestDTO.getFixerId());
        }
    }
    
    //HÀm sửa trạng thái của user sang đang sửa
    private void saveStatusUser(int id) {
        User user = userDAO.findUserById(id);
        user.setStatus(ConstantVariableCommon.STATUS_USER_3);
        userRepository.save(user);
    }
    
    //Hàm thêm dịch vụ trong hóa đơn
    private void addServiceOrder(InvoiceAddRequestDTO invoiceAddRequestDTO, Invoice invoice){
        List<ServiceOrder> serviceOrders = new ArrayList<>();
        for (int i = 0; i< invoiceAddRequestDTO.getServiceDTOS().size() ; i++){
            ServiceOrder serviceOrder = new ServiceOrder();
            serviceOrder.setServiceId(invoiceAddRequestDTO.getServiceDTOS().get(i).getId());
            serviceOrder.setInvoice(invoice);
            serviceOrder.setStatus(ConstantVariableCommon.STATUS_SERVICE_ORDER_1);
            serviceOrder.setCode(Common.GenerateCodeServiceOrder());
            serviceOrder.setCreatedAt();
            serviceOrders.add(serviceOrder);
        }
        saveServiceOrders(serviceOrders);
    }
    
    //hàm thêm phụ kiện trong hóa đơn
    private void addMaterialOrder(InvoiceAddRequestDTO invoiceAddRequestDTO, Invoice invoice){
        List<MaterialOrder> materialOrders  = new ArrayList<>();
        for(int i = 0; i < invoiceAddRequestDTO.getMaterialDTOS().size() ; i++){
            MaterialOrder materialOrder = new MaterialOrder();
            materialOrder.setMaterialId(invoiceAddRequestDTO.getMaterialDTOS().get(i).getId());
            materialOrder.setQuantity(invoiceAddRequestDTO.getMaterialDTOS().get(i).getQuantity());
            materialOrder.setStatus(ConstantVariableCommon.STATUS_MATERIAL_ORDER_1);
            materialOrder.setCode(Common.GenerateCodeMaterialOrder());
            materialOrder.setInvoice(invoice);
            materialOrder.setCreatedAt();
            materialOrders.add(materialOrder);
            editMaterial(invoiceAddRequestDTO.getMaterialDTOS().get(i));
        }
        saveMaterialOrders(materialOrders);
    }

    private void checkQuantity(int id , int quantity){
        Material material = materialDAO.findMaterialById(id);
        if(quantity > material.getQuantity()){
            throw new InputException("Số lượng phụ kiện mua quá số lượng phụ kiện hiện có");
        }
    }
    
    //Hàm sửa số lượng trong material
    void editMaterial (InvoiceMaterialOrderRequestDTO materialDTO){
        Material material = materialDAO.findMaterialById(materialDTO.getId());
        material.setQuantity(material.getQuantity() - materialDTO.getQuantity());
        saveMaterial(material);
    }
    
    
    
    //Lưu dịch vụ trong hóa đơn bằng repository
    @Transactional(rollbackOn = Exception.class)
    void saveServiceOrders(List<ServiceOrder> serviceOrders){
        try{
            serviceOrderRepository.saveAll(serviceOrders);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Lỗi không lưu được dịch vụ order - service", e);
        }
    }
    
    //Lưu phụ kiện trong hóa đơn bằng repository
    @Transactional(rollbackOn = Exception.class)
    void saveMaterialOrders(List<MaterialOrder> materialOrders){
        try{
            materialOrderRepository.saveAll(materialOrders);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Lỗi không lưu được phụ kiện order - service", e);
        }
    }
    //Lưu hóa đơn bằng repository
    @Transactional(rollbackOn = Exception.class)
    void saveInvoiceRepo(Invoice invoice){
        try{
            invoiceRepository.save(invoice);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Lỗi không lưu được hóa đơn - service",e);
        }
    }
    
    @Transactional(rollbackOn = Exception.class)
    void saveMaterial(Material material){
        try {
            materialRepository.save(material);
        }catch (Exception e){
            LOGGER.error("ERROR: {} | Lỗi không lưu được phụ kiện");
        }
    }
    
    //Hàm tìm hóa đơn bằng id
    @Override
    public InvoiceEditResponseDTO findInvoiceById(int id){
        InvoiceEditResponseDTO invoiceEditResponseDTO = new InvoiceEditResponseDTO();
        List<MaterialOrderResponseDTO> materialOrderResponseDTOS = findMaterialByIdInvoice(id);
        List<ServiceOrderResponseDTO> serviceOrderResponseDTOS = findServiceByIdInvoice(id);
        
        
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        invoiceEditResponseDTO.setNote(invoice.getNote());
        invoiceEditResponseDTO.setPayMethod(invoice.getPayMethod());
        invoiceEditResponseDTO.setId(id);
        invoiceEditResponseDTO.setStatus(ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));


        //set customer vehicle
        InvoiceCustomerVehicleDTO customerVehicleDTO = findCustomerVehicle(invoice);
        invoiceEditResponseDTO.setCustomerVehicleDTO(customerVehicleDTO);

        InvoiceUserResponseDTO userResponseDTO = new  InvoiceUserResponseDTO();
        
        if(invoice.getFixerId() == null || invoice.getFixerId() == 0){
            userResponseDTO = new InvoiceUserResponseDTO(0, " ", " ", " ");
        }else {
            User user = userDAO.findUserById(invoice.getFixerId());
            userResponseDTO = new InvoiceUserResponseDTO(user.getId(), user.getCode(), user.getPhone(), user.getName());
        }
        invoiceEditResponseDTO.setUserDTO(userResponseDTO);
        invoiceEditResponseDTO.setMaterialOrderResponseDTOS(materialOrderResponseDTOS);
        invoiceEditResponseDTO.setServiceOrderResponseDTOS(serviceOrderResponseDTOS);
        
        return invoiceEditResponseDTO;
    }

    //Hàm tìm thông tin Customer vehicle theo invoice
    private InvoiceCustomerVehicleDTO findCustomerVehicle(Invoice invoice) {
        VehicleCustomer vehicleCustomer = vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId());
        Customer customer = customerDAO.findCustomerById(vehicleCustomer.getCustomerId());
        Vehicle vehicle = new Vehicle();
        if(vehicleCustomer.getVehicleId() != null){
            vehicle = vehicleDAO.findVehicleById(vehicleCustomer.getVehicleId());
        }else {
            vehicle = new Vehicle();
        }
        InvoiceVehicleResponseDTO vehicleDTO = new InvoiceVehicleResponseDTO(vehicle.getId(), vehicle.getCode(), vehicle.getLicensePlate());
        InvoiceCustomerResponseDTO customerDTO = new InvoiceCustomerResponseDTO(customer.getId(), customer.getCode(), customer.getPhone(), customer.getName());
        InvoiceCustomerVehicleDTO customerVehicleDTO = new InvoiceCustomerVehicleDTO();
        customerVehicleDTO.setCustomerDTO(customerDTO);
        customerVehicleDTO.setVehicleDTO(vehicleDTO);
        return customerVehicleDTO;
    }
    // Hàm xóa hóa đơn 1,2,7 (sửa status về 6)
    @Override
    public void deleteInvoice(int id) {
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        InvoiceValidate.checkInvoiceDelete(invoice.getStatus());
        invoice.setDeletedAt();
        invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_6);
        if(invoice.getFixerId() != 0 && invoice.getFixerId() != null ){
            User user = userDAO.findUserById(invoice.getFixerId());
            user.setStatus(ConstantVariableCommon.STATUS_USER_4);
        }
        List<MaterialOrderResponseDTO> materialOrderResponseDTOS = findMaterialByIdInvoice(id);
//       List<MaterialOrder> materialOrders = invoiceDAO.findMaterialOrderByIdInvoice(id);
        materialOrderResponseDTOS.forEach(materialOrderResponseDTO -> {
            System.out.println(materialOrderResponseDTO.getId());
            Material material = materialRepository.findMaterialById(materialOrderResponseDTO.getId());
            int quantity = material.getQuantity() + materialOrderResponseDTO.getQuantityBuy();
            System.out.println(quantity);
            material.setQuantity(quantity);
            System.out.println(material.getQuantity());
            materialRepository.save(material);
        });
        
        saveInvoiceRepo(invoice);
    }
    
    
    //Hàm tìm phụ kiện bằng id hóa đơn
    private List<MaterialOrderResponseDTO> findMaterialByIdInvoice(int id){
        List<MaterialOrderResponseDTO> materialOrderResponseDTOS = new ArrayList<>();
        List<MaterialOrder> materialOrders = invoiceDAO.findMaterialOrderByIdInvoice(id);
        for (int i =0 ; i< materialOrders.size() ; i++){
            Invoice invoices = invoiceDAO.findInvoiceById(materialOrders.get(i).getInvoice().getId());
            Material materials = materialDAO.findMaterialById(materialOrders.get(i).getMaterialId());

            MaterialOrderResponseDTO materialOrderResponseDTO = new MaterialOrderResponseDTO(materials.getId(),materialOrders.get(i).getId(),materials.getCode() , materials.getName(), materials.getOutputPrice(), materials.getQuantity(), materialOrders.get(i).getQuantity(), ConstantVariableCommon.statusMaterialOrderIntToString(materialOrders.get(i).getStatus()));
            materialOrderResponseDTOS.add(materialOrderResponseDTO);


        }
        return materialOrderResponseDTOS;
    }


    //Hàm tìm dịch vụ bằng id  hóa đơn
    private List<ServiceOrderResponseDTO> findServiceByIdInvoice(int id){
        List<ServiceOrderResponseDTO> serviceOrderResponseDTOS =new ArrayList<>();
        List<ServiceOrder> serviceOrders = invoiceDAO.findServiceOrderByIdInvoice(id);
        System.out.println(serviceOrders);
        for (int i=0; i < serviceOrders.size() ; i++){
            Invoice invoices = invoiceDAO.findInvoiceById(serviceOrders.get(i).getInvoice().getId());
            Service service  = serviceDAO.findServiceById(serviceOrders.get(i).getServiceId());
            
            ServiceOrderResponseDTO serviceOrderResponseDTO = new ServiceOrderResponseDTO( service.getId(),serviceOrders.get(i).getId(), service.getCode(), service.getName(), service.getDescription(), service.getPrice(), ConstantVariableCommon.statusServiceOrderIntToString(serviceOrders.get(i).getStatus()));
            serviceOrderResponseDTOS.add(serviceOrderResponseDTO);
            
        }
        
        return serviceOrderResponseDTOS;
        
    }



    //Hàm chuyển trạng thái của material-order và service-order
    @Override
    public void changeStatusOrderInvoice(int id, boolean agreement){
        List<MaterialOrder> materialOrders = invoiceDAO.findMaterialOrderByIdInvoice(id);
        List<ServiceOrder> serviceOrders = invoiceDAO.findServiceOrderByIdInvoice(id);
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_2);
        saveInvoiceRepo(invoice);
        
        if(agreement == true){
            for(int i =0; i< serviceOrders.size(); i++){
                if(serviceOrders.get(i).getStatus() == 2){
                    ServiceOrder serviceOrder = invoiceDAO.findServiceOrderById(serviceOrders.get(i).getId());
                    serviceOrder.setStatus(ConstantVariableCommon.STATUS_SERVICE_ORDER_1);
                    serviceOrderRepository.save(serviceOrder);
                }
            }
            for(int i =0; i< materialOrders.size(); i++){
                if(materialOrders.get(i).getStatus() == 2){
                    MaterialOrder materialOrder = invoiceDAO.findMaterialOrderById(materialOrders.get(i).getId());
                    materialOrder.setStatus(ConstantVariableCommon.STATUS_MATERIAL_ORDER_1);
                    materialOrderRepository.save(materialOrder);
                }
            }
        }else {
            for(int i =0; i< serviceOrders.size(); i++){
                if(serviceOrders.get(i).getStatus() == 2){
                    ServiceOrder serviceOrder = invoiceDAO.findServiceOrderById(serviceOrders.get(i).getId());
                    serviceOrder.setStatus(ConstantVariableCommon.STATUS_SERVICE_ORDER_3);
                    serviceOrderRepository.save(serviceOrder);
                }
            }
            for(int i =0; i< materialOrders.size(); i++){
                if(materialOrders.get(i).getStatus() == 2){
                    MaterialOrder materialOrder = invoiceDAO.findMaterialOrderById(materialOrders.get(i).getId());
                    materialOrder.setStatus(ConstantVariableCommon.STATUS_MATERIAL_ORDER_3);
                    materialOrderRepository.save(materialOrder);
                }
            }
        }
    }
    
    //hàm sửa hóa đơn
    @Override
    public void editInvoice(int id, InvoiceEditRequestDTO invoiceEditRequestDTO){
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        invoice.setUpdatedAt();
        invoice.setFixerId(invoiceEditRequestDTO.getFixerId());
        User user = userDAO.findUserById(invoiceEditRequestDTO.getFixerId());
        user.setStatus(ConstantVariableCommon.STATUS_USER_3);
        invoice.setNote(invoiceEditRequestDTO.getNote());
        invoice.setTotal(invoiceEditRequestDTO.getTotal());
        invoice.setPayMethod(invoiceEditRequestDTO.getPayMethod());
        invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_7);
        
        editServiceOrder(invoiceEditRequestDTO, invoice);
        editMaterialOrder(invoiceEditRequestDTO, invoice);
        userRepository.save(user);
        saveInvoiceRepo(invoice);
    }
    
    
    //Hàm thêm dịch vụ trong hóa đơn
    private void editServiceOrder(InvoiceEditRequestDTO invoiceEditRequestDTO, Invoice invoice){
        List<ServiceOrder> serviceOrderList = new ArrayList<>();
        
        for (int i = 0; i< invoiceEditRequestDTO.getServiceDTOS().size() ; i++){
            if(invoiceEditRequestDTO.getServiceDTOS().get(i).getServiceOrderId() == 0) {
                ServiceOrder serviceOrder = new ServiceOrder();
                serviceOrder.setServiceId(invoiceEditRequestDTO.getServiceDTOS().get(i).getId());
                serviceOrder.setInvoice(invoice);
                serviceOrder.setStatus(ConstantVariableCommon.STATUS_SERVICE_ORDER_2);
                serviceOrder.setCode(Common.GenerateCodeServiceOrder());
                serviceOrder.setCreatedAt();
                serviceOrderList.add(serviceOrder);
            }
        }
        saveServiceOrders(serviceOrderList);
    }
    
    //hàm thêm phụ kiện trong hóa đơn
    private void editMaterialOrder(InvoiceEditRequestDTO invoiceEditRequestDTO, Invoice invoice){
        List<MaterialOrder> materialOrders  = new ArrayList<>();
        for(int i = 0; i < invoiceEditRequestDTO.getMaterialDTOS().size() ; i++){
            
            if(invoiceEditRequestDTO.getMaterialDTOS().get(i).getMaterialOrderId() == 0) {
                MaterialOrder materialOrder = new MaterialOrder();
                materialOrder.setMaterialId(invoiceEditRequestDTO.getMaterialDTOS().get(i).getId());
                materialOrder.setQuantity(invoiceEditRequestDTO.getMaterialDTOS().get(i).getQuantity());
                materialOrder.setStatus(ConstantVariableCommon.STATUS_MATERIAL_ORDER_2);
                materialOrder.setCode(Common.GenerateCodeMaterialOrder());
                materialOrder.setInvoice(invoice);
                materialOrder.setCreatedAt();
                materialOrders.add(materialOrder);
            }else{
                MaterialOrder materialOrder = invoiceDAO.findMaterialOrderById(invoiceEditRequestDTO.getMaterialDTOS().get(i).getMaterialOrderId());
                if(materialOrder.getQuantity() != invoiceEditRequestDTO.getMaterialDTOS().get(i).getQuantity()){
                    
                    materialOrder.setQuantity(invoiceEditRequestDTO.getMaterialDTOS().get(i).getQuantity());
                    materialOrder.setStatus(ConstantVariableCommon.STATUS_MATERIAL_ORDER_2);
                    materialOrder.setUpdatedAt();
                    materialOrders.add(materialOrder);
                }
            }
            editMaterial(invoiceEditRequestDTO.getMaterialDTOS().get(i));
        }
        saveMaterialOrders(materialOrders);
    }
    
    private void editMaterial(MaterialOrderRequestDTO materialOrderRequestDTO){
        Material material = materialDAO.findMaterialById(materialOrderRequestDTO.getId());
        material.setQuantity(material.getQuantity() - materialOrderRequestDTO.getQuantity());
        saveMaterial(material);
    }
    
    // Hàm tìm tất cả phiếu sửa chữa chưa có nv sửa chữa
    @Override
    public InvoiceListPaginationResponseDTO findAllInvoiceNoFixer(int page, int limit, String keyword){
        List<Invoice> invoices = invoiceDAO.findAllInvoiceNoFixer(keyword);
        InvoiceListPaginationResponseDTO invoiceListPaginationResponseDTO = paginationListInvoice(page, limit, invoices);
        return invoiceListPaginationResponseDTO;
    }
    
    //Hàm lấy list phiếu sửa chữa có trạng thái 1,2,3,7
    @Override
    public List<Invoice> findAllInvoiceByStatusOfStaff() {
        List<Integer> statusOfStaff = new ArrayList<>();
        statusOfStaff.add(ConstantVariableCommon.STATUS_INVOICE_1);
        statusOfStaff.add(ConstantVariableCommon.STATUS_INVOICE_2);
        statusOfStaff.add(ConstantVariableCommon.STATUS_INVOICE_3);
        statusOfStaff.add(ConstantVariableCommon.STATUS_INVOICE_7);
        
        List<Invoice> invoices = invoiceDAO.findAllInvoiceByStatusOfStaff(statusOfStaff);
        return invoices;
    }
    
    //Hàm nhận phiếu sửa chữa của nhân viên sửa chữa
    @Override
    public void getVoteFixer(int userId, int id){
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        User fixer = userDAO.findUserById(userId);
        invoice.setFixerId(fixer.getId());
        saveInvoiceRepo(invoice);
    }
    
    //Hàm xác nhận phiếu và sửa chữa
    @Override
    public void receiptInvoiceByFixer(int id){
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        if(invoiceDAO.findServiceOrderByIdInvoice(invoice.getId()).size() == 0 && invoiceDAO.findMaterialOrderByIdInvoice(invoice.getId()).size() == 0){
            throw new InputException("Phiếu sửa chữa không có phụ kiện và dịch vụ!");
        }else{
            if(invoice.getFixerId() != null){
                User user = userDAO.findUserById(invoice.getFixerId());
                user.setStatus(ConstantVariableCommon.STATUS_USER_3);
                invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_3);
                userRepository.save(user);
            }else {
                throw new InputException("Chưa có thợ sửa!");
            }
        }
        
        saveInvoiceRepo(invoice);
    }
    
    @Override
    public void finishInvoiceByFixer(int id){
        Invoice invoice = invoiceDAO.findInvoiceById(id);
        invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_4);
        User user = userDAO.findUserById(invoice.getFixerId());
        user.setStatus(ConstantVariableCommon.STATUS_USER_4);
        userRepository.save(user);
        saveInvoiceRepo(invoice);
    }
    //Hàm tìm invoice bằng id
    @Override
    public InvoiceEditResponseDTO findInvoiceConfirmById(int id){
        InvoiceEditResponseDTO invoiceEditResponseDTO = new InvoiceEditResponseDTO();
        List<MaterialOrderResponseDTO> materialOrderResponseDTOS = findMaterialConfirmByIdInvoice(id);
        List<ServiceOrderResponseDTO> serviceOrderResponseDTOS = findServiceConfirmByIdInvoice(id);


        Invoice invoice = invoiceDAO.findInvoiceById(id);
        invoiceEditResponseDTO.setNote(invoice.getNote());
        invoiceEditResponseDTO.setPayMethod(invoice.getPayMethod());
        invoiceEditResponseDTO.setId(id);
        invoiceEditResponseDTO.setStatus(ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
        //set customer vehicle
        InvoiceCustomerVehicleDTO customerVehicleDTO = findCustomerVehicle(invoice);
        invoiceEditResponseDTO.setCustomerVehicleDTO(customerVehicleDTO);

        InvoiceUserResponseDTO userResponseDTO = new  InvoiceUserResponseDTO();

        if(invoice.getFixerId() == null || invoice.getFixerId() == 0){
            userResponseDTO = new InvoiceUserResponseDTO(0, " ", " ", " ");
        }else {
            User user = userDAO.findUserById(invoice.getFixerId());
            userResponseDTO = new InvoiceUserResponseDTO(user.getId(), user.getCode(), user.getPhone(), user.getName());
        }
        invoiceEditResponseDTO.setUserDTO(userResponseDTO);
        invoiceEditResponseDTO.setMaterialOrderResponseDTOS(materialOrderResponseDTOS);
        invoiceEditResponseDTO.setServiceOrderResponseDTOS(serviceOrderResponseDTOS);

        return invoiceEditResponseDTO;
    }

    //Hàm tìm phụ kiện bằng id hóa đơn
    private List<MaterialOrderResponseDTO> findMaterialConfirmByIdInvoice(int id){
        List<MaterialOrderResponseDTO> materialOrderResponseDTOS = new ArrayList<>();
        List<MaterialOrder> materialOrders = invoiceDAO.findMaterialConfirmOrderByIdInvoice(id);
        for (int i =0 ; i< materialOrders.size() ; i++){
            Invoice invoices = invoiceDAO.findInvoiceById(materialOrders.get(i).getInvoice().getId());
            Material materials = materialDAO.findMaterialById(materialOrders.get(i).getMaterialId());
            MaterialOrderResponseDTO materialOrderResponseDTO = new MaterialOrderResponseDTO(materials.getId(),materialOrders.get(i).getId(),materials.getCode() , materials.getName(), materials.getOutputPrice(), materials.getQuantity(), materialOrders.get(i).getQuantity(), ConstantVariableCommon.statusMaterialOrderIntToString(materialOrders.get(i).getStatus()));
            materialOrderResponseDTOS.add(materialOrderResponseDTO);
        }
        return materialOrderResponseDTOS;
    }

    //Hàm tìm dịch vụ bằng id  hóa đơn
    private List<ServiceOrderResponseDTO> findServiceConfirmByIdInvoice(int id){
        List<ServiceOrderResponseDTO> serviceOrderResponseDTOS =new ArrayList<>();
        List<ServiceOrder> serviceOrders = invoiceDAO.findServiceConfirmOrderByIdInvoice(id);
        for (int i=0; i < serviceOrders.size() ; i++){
            Invoice invoices = invoiceDAO.findInvoiceById(serviceOrders.get(i).getInvoice().getId());
            Service service  = serviceDAO.findServiceById(serviceOrders.get(i).getServiceId());
            ServiceOrderResponseDTO serviceOrderResponseDTO = new ServiceOrderResponseDTO( service.getId(),serviceOrders.get(i).getId(), service.getCode(), service.getName(), service.getDescription(), service.getPrice(), ConstantVariableCommon.statusServiceOrderIntToString(serviceOrders.get(i).getStatus()));
            serviceOrderResponseDTOS.add(serviceOrderResponseDTO);
        }
        return serviceOrderResponseDTOS;
    }

    //Hàm kiểm tra số lượng material còn lại
    @Override
    public void compareQuantityMaterial(int id, int quantity){
        Material material = materialDAO.findMaterialById(id);
        if(quantity > material.getQuantity()){
            throw new InputException("Số lượng phụ kiện không đủ!");
        }
    }

    //Hàm tạo phiếu mua phụ kiện
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveInvoiceMaterial(InvoiceBuyMaterialRequest invoiceDTO){
        Invoice invoice = new Invoice();
        invoice.setTotal(invoiceDTO.getTotal());
        invoice.setCode(Common.GenerateCodeInvoice());
        invoice.setStatus(ConstantVariableCommon.STATUS_INVOICE_4);
        invoice.setPayMethod(invoiceDTO.getPayMethod());
        invoice.setNote(invoiceDTO.getNote());
        invoice.setCreatedAt();
        saveInvoiceRepo(invoice);
        addMaterialOrders(invoiceDTO, invoice);
        VehicleCustomer vehicleCustomer = vehicleDAO.findVehicleCustomerByIdCustomer(invoiceDTO.getCustomerId());
        invoice.setVehicleCustomerId(vehicleCustomer.getId());
    }

    //hàm thêm phụ kiện trong hóa đơn
    private void addMaterialOrders(InvoiceBuyMaterialRequest invoiceDTO, Invoice invoice){
        List<MaterialOrder> materialOrders  = new ArrayList<>();
        for(int i = 0; i < invoiceDTO.getMaterialDTOS().size() ; i++){
            MaterialOrder materialOrder = new MaterialOrder();
            materialOrder.setMaterialId(invoiceDTO.getMaterialDTOS().get(i).getId());
            materialOrder.setQuantity(invoiceDTO.getMaterialDTOS().get(i).getQuantity());
            materialOrder.setStatus(ConstantVariableCommon.STATUS_MATERIAL_ORDER_1);
            materialOrder.setCode(Common.GenerateCodeMaterialOrder());
            materialOrder.setInvoice(invoice);
            materialOrder.setCreatedAt();
            materialOrders.add(materialOrder);
            editMaterial(invoiceDTO.getMaterialDTOS().get(i));
        }
        saveMaterialOrders(materialOrders);
    }
}

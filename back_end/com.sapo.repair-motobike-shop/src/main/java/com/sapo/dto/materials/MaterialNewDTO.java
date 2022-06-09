package com.sapo.dto.materials;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public class MaterialNewDTO {
    @NotBlank(message = "Tên phụ kiện không được để trống")
    @NotNull(message = "Tên phụ kiện không được để trống")
    private String name;
    private String description;
    private String supplier;
    
    
    @NotNull(message = "Giá nhập không được để trống")
    private BigDecimal inputPrice;
    
    private BigDecimal outputPrice;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public BigDecimal getInputPrice() {
        return inputPrice;
    }

    public void setInputPrice(BigDecimal inputPrice) {
        this.inputPrice = inputPrice;
    }

    public BigDecimal getOutputPrice() {
        return outputPrice;
    }

    public void setOutputPrice(BigDecimal outputPrice) {
        this.outputPrice = outputPrice;
    }
}

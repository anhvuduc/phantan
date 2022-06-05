package com.sapo.dto.role;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class PermissionIdRequestDTO {
    @NotBlank(message = "Không truyền được id")
    @NotNull(message = "Không truyền được id")
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}

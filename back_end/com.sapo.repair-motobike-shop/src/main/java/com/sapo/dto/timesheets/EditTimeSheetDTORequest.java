package com.sapo.dto.timesheets;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class EditTimeSheetDTORequest {

    @NotBlank(message = "Số ngày công không được để trống")
    @NotNull(message = "Số ngày công không được để trống")
    @Size(min = 0, max = 2, message = "Số ngày công không được quá 31")
    private int numberShiftsWork;

    @NotBlank(message = "Số ngày công không được để trống")
    @NotNull(message = "Số ngày công không được để trống")
    @Size(min = 0, max = 2, message = "Số ngày công đi muộn không được quá 31")
    private int numberShiftsLateWork;

    private int status;

    public EditTimeSheetDTORequest(int numberShiftsWork, int numberShiftsLateWork, int status) {
        this.numberShiftsWork = numberShiftsWork;
        this.numberShiftsLateWork = numberShiftsLateWork;
        this.status = status;
    }

    public int getNumberShiftsWork() {
        return numberShiftsWork;
    }

    public void setNumberShiftsWork(int numberShiftsWork) {
        this.numberShiftsWork = numberShiftsWork;
    }

    public int getNumberShiftsLateWork() {
        return numberShiftsLateWork;
    }

    public void setNumberShiftsLateWork(int numberShiftsLateWork) {
        this.numberShiftsLateWork = numberShiftsLateWork;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

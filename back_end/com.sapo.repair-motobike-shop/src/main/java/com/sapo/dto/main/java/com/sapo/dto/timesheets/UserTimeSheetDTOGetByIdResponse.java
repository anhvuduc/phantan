package com.sapo.dto.timesheets;

public class UserTimeSheetDTOGetByIdResponse {
    private  int id;
    private String code;
    private String name;
    private int numberShiftsWork;
    private int numberShiftsLateWork;
    private int month;
    private int status;

    public UserTimeSheetDTOGetByIdResponse(int id ,String code, String name, int numberShiftsWork, int numberShiftsLateWork, int month, int status) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.numberShiftsWork = numberShiftsWork;
        this.numberShiftsLateWork = numberShiftsLateWork;
        this.month = month;
        this.status = status;
    }

    public UserTimeSheetDTOGetByIdResponse() {

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

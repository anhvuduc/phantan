package com.sapo.dto.timesheets;

import com.sapo.common.Common;

public class UserTimeSheetDTOExportExcel {
    private String code;
    private String name;
    private int numberShiftsWork;
    private int numberShiftsLateWork;
    private int month;
    private double salary;

    public UserTimeSheetDTOExportExcel(String code, String name, int numberShiftsWork, int numberShiftsLateWork, int month, double salary) {
        this.code = code;
        this.name = name;
        this.numberShiftsWork = numberShiftsWork;
        this.numberShiftsLateWork = numberShiftsLateWork;
        this.month = month;
        this.salary = salary;
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

    public String getSalary() {
        String s = Common.getStringPriceVN(salary);
        return s;
    }

    public double getSalaryDouble() {
        return salary;
    }


    public void setSalary(double salary) {
        this.salary = salary;
    }

}

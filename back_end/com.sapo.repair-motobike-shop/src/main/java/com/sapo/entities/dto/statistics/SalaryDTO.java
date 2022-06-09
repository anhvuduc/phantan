package com.sapo.dto.statistics;

import java.math.BigDecimal;

public class SalaryDTO {

    private int id;
    private String code;
    private String name;
    private BigDecimal salaryDay;
    private int month;
    private int numberShiftWork;
    private int numberShiftLateWork;
    private BigDecimal totalSalary;

    public SalaryDTO(int id, String code, String name, BigDecimal salaryDay, int month, int numberShiftWork, int numberShiftLateWork, BigDecimal totalSalary) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.salaryDay = salaryDay;
        this.month = month;
        this.numberShiftWork = numberShiftWork;
        this.numberShiftLateWork = numberShiftLateWork;
        this.totalSalary = totalSalary;
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

    public BigDecimal getSalaryDay() {
        return salaryDay;
    }

    public void setSalaryDay(BigDecimal salaryDay) {
        this.salaryDay = salaryDay;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getNumberShiftWork() {
        return numberShiftWork;
    }

    public void setNumberShiftWork(int numberShiftWork) {
        this.numberShiftWork = numberShiftWork;
    }

    public int getNumberShiftLateWork() {
        return numberShiftLateWork;
    }

    public void setNumberShiftLateWork(int numberShiftLateWork) {
        this.numberShiftLateWork = numberShiftLateWork;
    }

    public BigDecimal getTotalSalary() {
        return totalSalary;
    }

    public void setTotalSalary(BigDecimal totalSalary) {
        this.totalSalary = totalSalary;
    }
}

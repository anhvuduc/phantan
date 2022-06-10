package com.sapo.entities;

import javax.persistence.*;

@Entity
@Table(name = "tbl_timesheets")
public class Timesheet extends BaseEntity {

    @Column(name = "number_shifts_work", nullable = true)
    private int numberShiftsWork;

    @Column(name = "number_shifts_late_work", nullable = true)
    private int numberShiftsLateWork;

    @Column(name = "month", nullable = true)
    private int month;

    @Column(name = "status", nullable = true)
    private int status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id") // tên field khoá ngoại
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

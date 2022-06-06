package com.sapo.dto.users;

import java.util.List;

public class UserTimeSheetsRequestDTO {
    private List<Integer> ids;
    private int month;

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }
}

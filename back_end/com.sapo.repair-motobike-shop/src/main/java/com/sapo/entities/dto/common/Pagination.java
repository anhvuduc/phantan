package com.sapo.dto.common;

public class Pagination {
    private int page;
    private int limit;
    private int totalRows;

    public Pagination(int page, int limit, int totalRows) {
        this.page = page;
        this.limit = limit;
        this.totalRows = totalRows;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }
}

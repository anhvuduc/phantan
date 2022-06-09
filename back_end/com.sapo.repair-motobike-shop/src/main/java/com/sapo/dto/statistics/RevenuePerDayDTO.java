package com.sapo.dto.statistics;

import java.math.BigDecimal;

public class RevenuePerDayDTO {
    private long createAt;
    private BigDecimal totalOutput;

    public long getCreateAt() {
        return createAt;
    }

    public void setCreateAt(long createAt) {
        this.createAt = createAt;
    }

    public BigDecimal getTotalOutput() {
        return totalOutput;
    }

    public void setTotalOutput(BigDecimal totalOutput) {
        this.totalOutput = totalOutput;
    }
}

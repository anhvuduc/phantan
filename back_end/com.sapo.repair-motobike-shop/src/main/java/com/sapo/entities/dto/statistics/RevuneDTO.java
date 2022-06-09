package com.sapo.dto.statistics;
import java.math.BigDecimal;

public class RevuneDTO {
    private long createAt;
    private BigDecimal totalOutput;

    public RevuneDTO(long createAt, BigDecimal totalOutput) {
        this.createAt = createAt;
        this.totalOutput = totalOutput;
    }

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

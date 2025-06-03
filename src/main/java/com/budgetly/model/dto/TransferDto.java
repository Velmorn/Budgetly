package com.budgetly.model.dto;

public record TransferDto(Long fromBillId,
                          Long toBillId,
                          double amount) {
}

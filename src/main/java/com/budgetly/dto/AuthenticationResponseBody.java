package com.budgetly.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthenticationResponseBody {
    private final String token;
    private final String message;
}

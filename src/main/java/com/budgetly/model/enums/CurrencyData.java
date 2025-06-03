package com.budgetly.model.enums;

public enum CurrencyData {
    USD("US Dollar", "$", 1.0),
    EUR("Euro", "€", 1.1),
    UAH("Ukrainian Hryvnia", "₴", 0.027),
    GBP("British Pound", "£", 1.3),
    CNY("Chinese Yuan", "¥", 0.14),
    CHF("Swiss Franc", "CHF", 1.12),
    JPY("Japanese Yen", "¥", 0.0064),
    PLN("Polish Zloty", "zł", 0.25);

    private final String name;
    private final String symbol;
    private final double rateToUSD;

    CurrencyData(String name, String symbol, double rateToUSD) {
        this.name = name;
        this.symbol = symbol;
        this.rateToUSD = rateToUSD;
    }

    public String getName() {
        return name;
    }

    public String getSymbol() {
        return symbol;
    }

    public double getRateToUSD() {
        return rateToUSD;
    }
}


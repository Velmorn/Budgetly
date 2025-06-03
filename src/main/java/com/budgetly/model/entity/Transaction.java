package com.budgetly.model.entity;

import com.budgetly.model.enums.CurrencyData;
import com.budgetly.model.enums.TransactionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TransactionType type;

    @Column(name = "note")
    private String note;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "date")
    private Date date;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private CurrencyData currency;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "bill_id", nullable = false)
    private Bill bill;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "goal_id", nullable = true)
    private Goal goal;

    @ManyToOne
    @JoinColumn(name = "budget_period_id")
    @JsonIgnore
    private BudgetPeriodInstance budgetPeriodInstance;

    public static Double convertToMainCurrency(CurrencyData currencyToConvert, Double amount, User user) {
        Double amountInMainCurrency  = amount ;
        if (currencyToConvert != user.getMainCurrency()) {
            Double amountInUSD = amount * currencyToConvert.getRateToUSD();
            amountInMainCurrency = amountInUSD  / user.getMainCurrency().getRateToUSD();
        }

        return amountInMainCurrency;
    }

}

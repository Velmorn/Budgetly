package com.budgetly.model.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "budget_periods")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BudgetPeriodInstance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "amount")
    private Double amount;

    @ManyToOne
    @JsonIgnoreProperties("periods")
    @JoinColumn(name = "budget_id", nullable = false)
    private Budget budget;

    @OneToMany(mappedBy = "budgetPeriodInstance")
    private List<Transaction> transactions = new ArrayList<>();
}
package com.budgetly.model.entity;

import com.budgetly.model.enums.BudgetPeriod;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "budgets")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "period")
    private BudgetPeriod period;

    @Column(name = "period_count")
    private Integer periodCount;

    @Column(name = "budget_limit")
    private Double budgetLimit;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<BudgetPeriodInstance> periods = new ArrayList<>();

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "current_period_id")
    private BudgetPeriodInstance currentPeriod;

}

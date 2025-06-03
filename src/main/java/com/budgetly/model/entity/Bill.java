package com.budgetly.model.entity;
import com.budgetly.model.enums.CurrencyData;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "bills")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private CurrencyData currency;

    @Column(name = "balance")
    private Double balance;

    @Column(name = "color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "bill", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Transaction> transactions;

}

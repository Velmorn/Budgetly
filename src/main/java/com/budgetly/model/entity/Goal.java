package com.budgetly.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "goals")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "targetAmount")
    private Double targetAmount;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "startDate")
    private Date startDate;

    @Column(name = "iconUrl")
    private String iconUrl;

    @Column(name = "color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;


    @OneToMany(mappedBy = "goal")
    private List<Transaction> transactions = new ArrayList<>();
}

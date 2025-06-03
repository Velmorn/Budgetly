package com.budgetly.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "iconUrl")
    private String iconUrl;

    @Column(name = "color")
    private String color;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnore
    private List<Transaction> transactions;

    public Category(String name, String iconUrl, String color, User user) {
        this.name = name;
        this.iconUrl = iconUrl;
        this.color = color;
        this.user = user;
    }
}

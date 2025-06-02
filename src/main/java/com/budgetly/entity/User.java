package com.budgetly.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotNull
    @Column(unique = true)
    private String email;
    private Boolean emailVerified = false;
    private String emailVerificationToken = null;
    private LocalDateTime emailVerificationTokenExpiryDate = null;
    @JsonIgnore
    private String password;
    private String passwordResetToken = null;
    private LocalDateTime passwordResetTokenExpiryDate = null;

    private String username = null;

    @Enumerated(EnumType.STRING)
    @Column(name = "main_currency")
    private CurrencyData mainCurrency = null;
    private Boolean dataComplete = false;

    @OneToMany(mappedBy = "user")
    private List<Bill> bills = new ArrayList<>();

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
        updateUserDataCompletionStatus();
    }

    public void setMainCurrency(CurrencyData mainCurrency) {
        this.mainCurrency = mainCurrency;
        updateUserDataCompletionStatus();
    }

    public void updateUserDataCompletionStatus(){
        this.dataComplete = (this.username != null && this.mainCurrency != null);
    }


}

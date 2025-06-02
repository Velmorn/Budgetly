package com.budgetly.controller;

import com.budgetly.dto.AuthenticationRequestBody;
import com.budgetly.dto.AuthenticationResponseBody;
import com.budgetly.entity.CurrencyData;
import com.budgetly.entity.User;
import com.budgetly.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/authentication")
@CrossOrigin(origins = "http://localhost:5173")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public AuthenticationResponseBody loginPage(@Valid @RequestBody AuthenticationRequestBody loginRequestBody) {
        return authenticationService.login(loginRequestBody);
    }

    @PostMapping("/register")
    public AuthenticationResponseBody registerPage(@Valid @RequestBody AuthenticationRequestBody registerRequestBody) {
        return authenticationService.register(registerRequestBody);
    }

    @GetMapping("/user")
    public User getUser(@RequestAttribute("user") User user) {
        return authenticationService.getUser(user.getEmail());
    }

    @PutMapping("/validate-email-verification-token")
    public String verifyEmail(@RequestParam String token, @RequestAttribute("user") User user) {
        authenticationService.validateEmailVerificationToken(token, user.getEmail());
        return "Email verified successfully";
    }

    @GetMapping("/send-email-verification-token")
    public String sendEmailVerificationToken(@RequestAttribute("user") User user) {
        authenticationService.sendEmailVerificationToken(user.getEmail());
        return "Email verification token sent successfully";
    }

    @PutMapping("/send-password-reset-token")
    public String sendPasswordResetToken(@RequestParam String email) {
        authenticationService.sendPasswordResetToken(email);
        return "Password reset token sent successfully";
    }

    @PutMapping("/reset-password")
    public String resetPassword(@RequestParam String newPassword, @RequestParam String token, @RequestParam String email) {
        authenticationService.resetPassword(email, newPassword, token);
        return "Password reset successfully";
    }

    @PutMapping("/user/{id}")
    public User updateUserData(
            @RequestAttribute("user") User user,
            @PathVariable Long id,
            @RequestParam String username,
            @RequestParam CurrencyData mainCurrency
    ) {
        if(!user.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User does not have permission to update this user data");
        }

        return authenticationService.updateUserData(id, username, mainCurrency);
    }


}

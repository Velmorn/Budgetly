package com.budgetly.service;


import com.budgetly.model.dto.AuthenticationRequestBody;
import com.budgetly.model.dto.AuthenticationResponseBody;
import com.budgetly.model.entity.Bill;
import com.budgetly.model.entity.Category;
import com.budgetly.model.enums.CurrencyData;
import com.budgetly.model.entity.User;
import com.budgetly.model.repository.BillRepository;
import com.budgetly.model.repository.CategoryRepository;
import com.budgetly.model.repository.UserRepository;
import com.budgetly.utils.DefaultUserDataProvider;
import com.budgetly.utils.EmailService;
import com.budgetly.utils.Encoder;
import com.budgetly.utils.JsonWebToken;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class AuthenticationService {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final BillRepository billRepository;
    private final DefaultUserDataProvider defaultUserDataProvider;

    private final int durationInMinutes = 5;

    private final Encoder encoder;
    private final JsonWebToken jsonWebToken;
    private final EmailService emailService;

    public static String generateEmailVerificationToken() {
        SecureRandom random = new SecureRandom();
        StringBuilder token = new StringBuilder(5);
        for (int i = 0; i < 5; i++) {
            token.append(random.nextInt(10));
        }
        return token.toString();
    }

    public void sendEmailVerificationToken(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && !user.get().getEmailVerified()) {
            String emailVerificationToken = generateEmailVerificationToken();
            String hashedToken = encoder.encode(emailVerificationToken);
            user.get().setEmailVerificationToken(hashedToken);
            user.get().setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(durationInMinutes));
            userRepository.save(user.get());
            String subject = "Email verification";
            String body = String.format("Only one step to take full advantage of Budgetly.\n\n"
                            + "Enter this code to verify your email: " + "%s\n\n" + "The code will expire in " + "%s" + "minutes.",
                    emailVerificationToken, durationInMinutes);
            try {
                emailService.sendEmail(email, subject, body);
            } catch (Exception e) {
                logger.info("Error while sending email: {}" + e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("Email verification token failed, or email is already verified.");
        }
    }

    public void validateEmailVerificationToken(String token, String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && encoder.matches(token, user.get().getEmailVerificationToken()) && !user.get().getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) {
            user.get().setEmailVerified(true);
            user.get().setEmailVerificationToken(null);
            user.get().setEmailVerificationTokenExpiryDate(null);
            userRepository.save(user.get());
        } else if (user.isPresent() && encoder.matches(token, user.get().getEmailVerificationToken()) && user.get().getEmailVerificationTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Email verification token expired.");
        } else {
            throw new IllegalArgumentException("Email verification token failed.");
        }
    }

    public AuthenticationResponseBody login(AuthenticationRequestBody loginRequestBody) {
        User user = userRepository.findByEmail(loginRequestBody.getEmail()).orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!encoder.matches(loginRequestBody.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Wrong password");
        }
        String token = jsonWebToken.generateToken(loginRequestBody.getEmail());
        return new AuthenticationResponseBody(token, "Authentication successful.");
    }

    public AuthenticationResponseBody register(AuthenticationRequestBody registerRequestBody) {
        User user = userRepository.save(new User(registerRequestBody.getEmail(), encoder.encode(registerRequestBody.getPassword())));

        String emailVerificationToken = generateEmailVerificationToken();
        String hashedToken = encoder.encode(emailVerificationToken);
        user.setEmailVerificationToken(hashedToken);
        user.setEmailVerificationTokenExpiryDate(LocalDateTime.now().plusMinutes(durationInMinutes));

        userRepository.save(user);

        String subject = "Email Verification";
        String body = String.format("""
                        Only one step to take full advantage of Budgetly.

                        Enter this code to verify your email: %s. The code will expire in %s minutes.""",
                emailVerificationToken, durationInMinutes);
        try {
            emailService.sendEmail(registerRequestBody.getEmail(), subject, body);
        } catch (Exception e) {
            logger.info("Error while sending email: {}" + e.getMessage());
        }
        String authToken = jsonWebToken.generateToken(registerRequestBody.getEmail());
        return new AuthenticationResponseBody(authToken, "User successfully registered.");
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void sendPasswordResetToken(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent()) {
            String passwordResetToken = generateEmailVerificationToken();
            String hashedToken = encoder.encode(passwordResetToken);
            user.get().setPasswordResetToken(hashedToken);
            user.get().setPasswordResetTokenExpiryDate(LocalDateTime.now().plusMinutes(durationInMinutes));
            userRepository.save(user.get());
            String subject = "Password Reset";
            String body = String.format("""
                            You request a password reset.

                            Enter this code to reset your password: %s. The code will expire in %s minutes.""",
                    passwordResetToken, durationInMinutes);
            try {
                emailService.sendEmail(email, subject, body);
            } catch (Exception e) {
                logger.info("Error while sending email: {}" + e.getMessage());
            }
        } else {
            throw new IllegalArgumentException("User not found.");
        }
    }

    public void resetPassword(String email, String newPassword, String token) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && encoder.matches(token, user.get().getPasswordResetToken()) && !user.get().getPasswordResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            user.get().setPasswordResetToken(null);
            user.get().setPasswordResetTokenExpiryDate(null);
            user.get().setPassword(encoder.encode(newPassword));
            userRepository.save(user.get());
        } else if (user.isPresent() && encoder.matches(token, user.get().getPasswordResetToken()) && user.get().getPasswordResetTokenExpiryDate().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Password reset token expired.");
        } else {
            throw new IllegalArgumentException("Password reset token failed.");
        }
    }

    public User updateUserData(Long id, String username, CurrencyData mainCurrency){
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getDataComplete() == false){
            List<Category> defaultCategories = defaultUserDataProvider.getDefaultCategories(user);
            categoryRepository.saveAll(defaultCategories);
            Bill bill = defaultUserDataProvider.getDefaultBill(user);
            billRepository.save(bill);
        }
        user.setUsername(username);
        user.setMainCurrency(mainCurrency);
        return userRepository.save(user);
    }


}

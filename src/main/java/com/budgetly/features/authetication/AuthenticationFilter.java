package com.budgetly.features.authetication;

import com.budgetly.entity.User;
import com.budgetly.service.AuthenticationService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
@AllArgsConstructor
public class AuthenticationFilter extends HttpFilter {
    private final List<String> unsecuredEndpoints = Arrays.asList(
            "/api/authentication/login",
            "/api/authentication/register"
    );

    private final JsonWebToken jsonWebTokenService;
    private final AuthenticationService authenticationService;

    @Override
    protected void doFilter(HttpServletRequest req, HttpServletResponse resp, FilterChain chain) throws IOException, ServletException {
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
        resp.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            resp.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String path = req.getRequestURI();

        if(unsecuredEndpoints.contains(path)) {
            chain.doFilter(req, resp);
            return;
        }

        try {
            String authorization = req.getHeader("Authorization");

            if(authorization != null && !authorization.startsWith("Bearer ")) {
                throw new ServletException("Token missing.");
            }

            String token = authorization.substring(7);

            if(jsonWebTokenService.isTokenExpired(token)) {
                throw new ServletException("Invalid token.");
            }

            String email = jsonWebTokenService.getEmailFromToken(token);
            User user = authenticationService.getUser(email);
            req.setAttribute("user", user);
            chain.doFilter(req, resp);

        }catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"message\":\"Invalid authentication token, or token missing.\"}");
        }

    }

}

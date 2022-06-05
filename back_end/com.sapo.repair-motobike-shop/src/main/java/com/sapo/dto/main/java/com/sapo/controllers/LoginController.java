package com.sapo.controllers;


import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.dto.sercurity.JwtResponse;
import com.sapo.dto.sercurity.LoginForm;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth/login")
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public LoginController(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }


    @PostMapping
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {
        System.out.println("username: " +loginRequest.getUsername() + "password: " + loginRequest.getPassword());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }
}

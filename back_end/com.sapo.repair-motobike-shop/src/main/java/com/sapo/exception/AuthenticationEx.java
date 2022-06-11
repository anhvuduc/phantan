package com.sapo.exception;

public class AuthenticationEx extends RuntimeException {
    public AuthenticationEx(String message) {
        super(message);
    }
}

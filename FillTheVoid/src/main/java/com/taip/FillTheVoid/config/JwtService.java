package com.taip.FillTheVoid.config;


import org.springframework.security.core.userdetails.UserDetails;


public interface JwtService {

    String extractSubject(String jwt);
    boolean isTokenValid(String jwt, UserDetails userDetails);
    String generateToken(UserDetails userDetails);
}

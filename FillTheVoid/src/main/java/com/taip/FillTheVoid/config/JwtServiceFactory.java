package com.taip.FillTheVoid.config;

public abstract class JwtServiceFactory {

    public JwtService instantiateJwtService() {

        JwtService jwtService = createJwtService();
        return jwtService;
    }

    public abstract JwtService createJwtService();
}

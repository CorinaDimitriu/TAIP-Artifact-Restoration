package com.taip.FillTheVoid.config;

public class AuthJwtServiceFactory extends JwtServiceFactory{

    @Override
    public JwtService createJwtService() {
        return new AuthJwtService();
    }
}

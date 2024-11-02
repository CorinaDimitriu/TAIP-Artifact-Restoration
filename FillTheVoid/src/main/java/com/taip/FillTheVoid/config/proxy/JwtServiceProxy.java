package com.taip.FillTheVoid.config.proxy;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.logging.Logger;

@Primary
@Service
public class JwtServiceProxy implements JwtService {

    private final RealJwtService realJwtService;
    private final Logger logger = Logger.getLogger(JwtServiceProxy.class.getName());

    public JwtServiceProxy(RealJwtService realJwtService) {
        this.realJwtService = realJwtService;
    }

    @Override
    public String extractSubject(String jwt) {
        logger.info("Proxy: Extracting subject from token.");
        return realJwtService.extractSubject(jwt);
    }

    @Override
    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        logger.info("Proxy: Validating token.");

        if (!verifyParameters(jwt, userDetails)) {
            logger.warning("Proxy: Invalid parameters.");
            return false;
        }

        return realJwtService.isTokenValid(jwt, userDetails);
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        logger.info("Proxy: Generating token.");
        return realJwtService.generateToken(userDetails);
    }

    private boolean verifyParameters(String jwt, UserDetails userDetails) {

        if (jwt == null || userDetails == null)
            return false;

        return true;
    }
}

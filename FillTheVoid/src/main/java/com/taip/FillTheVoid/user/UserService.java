package com.taip.FillTheVoid.user;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;

    public User getUserByEmail(String email) {
        return this.repository.findByEmail(email).get();
    }

}

package com.mycompany.shop.user;

import com.mycompany.shop.product.ProductNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/userinfo")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<User> retrieveProduct(@PathVariable long id) {

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new ProductNotFoundException("The user with id: " + id + " is not found");
        }

        return  ResponseEntity.ok(optionalUser.get());
    }

}

package com.players.collection.Presentation.Controllers;

import java.net.URI;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.players.collection.Application.Services.UserService;
import com.players.collection.Domain.DTO.CredentialsDTO;
import com.players.collection.Domain.DTO.SingUpDTO;
import com.players.collection.Domain.DTO.UserDTO;
import com.players.collection.config.JwtAuthFilter;
import com.players.collection.config.UserAuthProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthController {

    @Autowired 
    private UserService userService;
    @Autowired
    private final UserAuthProvider userAuthProvider;

    private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);


    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody CredentialsDTO credentialDTO) {
        UserDTO userDTO = userService.login(credentialDTO);
        userDTO.setToken(userAuthProvider.createToken(userDTO));
        log.info("loged user: {}", userDTO.toString());
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody SingUpDTO SingUpDTO) {
        UserDTO user = userService.register(SingUpDTO);
        user.setToken(userAuthProvider.createToken(user));
        log.info("register user: {}", user.toString());
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }
    
}

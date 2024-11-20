package com.players.collection.Application.Services;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.players.collection.Application.Exceptions.AppException;
import com.players.collection.Application.Mappers.UserMapper;
import com.players.collection.Domain.DTO.CredentialsDTO;
import com.players.collection.Domain.DTO.SingUpDTO;
import com.players.collection.Domain.DTO.UserDTO;
import com.players.collection.Domain.Entities.User;
import com.players.collection.Infrastructure.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserDTO login(CredentialsDTO credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.login())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        //Compare the given password with the database.
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.password()), user.getPassword())) {
            return userMapper.toUserDTO(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDTO register(SingUpDTO singUpDTO){
        Optional<User> oUser = userRepository.findByLogin(singUpDTO.login());
        if(oUser.isPresent()){
            throw new AppException("User already exists", HttpStatus.BAD_REQUEST);
        }
        User user = userMapper.signUpToUser(singUpDTO);

        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(singUpDTO.password())));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDTO(savedUser);
    }

    public UserDTO findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDTO(user);
    }
}
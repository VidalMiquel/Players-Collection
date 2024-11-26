package com.players.collection.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.players.collection.Application.Services.UserService;
import com.players.collection.Domain.DTO.UserDTO;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    private final UserService userService;

    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(UserDTO user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3600000); // 1 hour

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(user.getLogin())
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .withClaim("firstName", user.getFirstName())
                .withClaim("lastName", user.getLastName())
                .sign(algorithm);
    }

    public Authentication validateToken(String token) throws AuthenticationException {
        JWTVerifier verifier = createVerifier();
        try {
            DecodedJWT decoded = verifier.verify(token);
            return createAuthentication(decoded);
        } catch (TokenExpiredException e) {
            throw new AuthenticationException("Token has expired, please login again.") {};
        }
    }

    private JWTVerifier createVerifier() {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        return JWT.require(algorithm).build();
    }

    private Authentication createAuthentication(DecodedJWT decoded) {
        UserDTO user = UserDTO.builder()
            .login(decoded.getIssuer())
            .firstName(decoded.getClaim("firstName").asString())
            .lastName(decoded.getClaim("lastName").asString())
            .build();
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

    public Authentication validateTokenStrongly(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT decoded = verifier.verify(token);

        UserDTO user = userService.findByLogin(decoded.getSubject());

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }

}


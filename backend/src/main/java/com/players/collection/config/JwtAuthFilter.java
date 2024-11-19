package com.players.collection.config;

import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserAuthProvider userAuthProvider;
    private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);

@Override
protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
    String header = request.getHeader(HttpHeaders.AUTHORIZATION);
    log.info("Authorization header: {}", header);
    if (header != null) {
        String[] authElements = header.split(" ");
        log.info("authElements: {}", Arrays.toString(authElements));

        if (authElements.length == 2
                && "Bearer".equals(authElements[0])) {
            try {
                if ("GET".equals(request.getMethod())) {
                    SecurityContextHolder.getContext().setAuthentication(
                            userAuthProvider.validateToken(authElements[1]));
                } else {
                    SecurityContextHolder.getContext().setAuthentication(
                            userAuthProvider.validateTokenStrongly(authElements[1]));
                }
            } catch (RuntimeException e) {
                SecurityContextHolder.clearContext();
                throw e;
            }
        }
    }

    filterChain.doFilter(request, response);
}

}
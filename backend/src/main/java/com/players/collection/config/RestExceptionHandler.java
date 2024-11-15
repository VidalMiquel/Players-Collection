package com.players.collection.config;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.players.collection.Application.Exceptions.AppException;
import com.players.collection.Domain.DTO.ErrorDTO;


@Component
public class RestExceptionHandler {
    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handleException(AppException ex){
        return ResponseEntity.status(ex.getHttpStatus())
            .body(new ErrorDTO(ex.getMessage()));
    }
}
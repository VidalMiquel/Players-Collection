package com.players.collection.Domain.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class  UserDTO {
    public Long id;
    private String firstName;
    private String lastName;
    private String login;
    private String token;
}
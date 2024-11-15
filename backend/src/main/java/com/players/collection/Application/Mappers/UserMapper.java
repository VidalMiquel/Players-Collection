package com.players.collection.Application.Mappers;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.players.collection.Domain.DTO.SingUpDTO;
import com.players.collection.Domain.DTO.UserDTO;
import com.players.collection.Domain.Entities.User;



@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toUserDTO(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SingUpDTO signUpDto);
}

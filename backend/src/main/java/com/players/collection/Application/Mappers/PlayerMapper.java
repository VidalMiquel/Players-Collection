package com.players.collection.Application.Mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.players.collection.Domain.DTO.PlayerDTO;
import com.players.collection.Domain.Entities.Player;

@Mapper(componentModel = "spring")
public interface  PlayerMapper {

    PlayerDTO toPlayerDTO(Player player);

    Player toPlayer(PlayerDTO playerDTO);

    List<PlayerDTO> toListPlayerDTO (List<Player> players);
}

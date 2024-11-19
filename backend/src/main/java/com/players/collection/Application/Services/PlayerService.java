package com.players.collection.Application.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.players.collection.Application.Mappers.PlayerMapper;
import com.players.collection.Application.Specifications.PlayerSpecifications;
import com.players.collection.Domain.DTO.PlayerDTO;
import com.players.collection.Domain.Entities.Player;
import com.players.collection.Domain.Filter.PlayerFilter;
import com.players.collection.Infrastructure.PlayerRepository;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerMapper playerMapper;

        public List<PlayerDTO> getPlayers(PlayerFilter filter) {
        Specification<Player> spec = Specification.where(PlayerSpecifications.hasTeam(filter.getTeam()))
                .or(PlayerSpecifications.hasPosition(filter.getPosition()));

        List<Player> players = playerRepository.findAll(spec);
        return playerMapper.toListPlayerDTO(players); // Convertir a DTO
    }
}

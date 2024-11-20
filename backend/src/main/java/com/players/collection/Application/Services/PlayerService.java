package com.players.collection.Application.Services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.players.collection.Application.Mappers.PlayerMapper;
import com.players.collection.Application.Specifications.PlayerSpecifications;
import com.players.collection.Domain.DTO.PlayerDTO;
import com.players.collection.Domain.DTO.PlayerFilterDTO;
import com.players.collection.Domain.Entities.Player;
import com.players.collection.Infrastructure.PlayerRepository;

@Service
public class PlayerService {

    private static final Logger log = LoggerFactory.getLogger(PlayerService.class);

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerMapper playerMapper;

    public List<PlayerDTO> getPlayers(PlayerFilterDTO filter) {
        log.info("filter getPlayers: {}", filter); // Usa {} para el log
        log.info("filter getPlayers - team: {}", filter.team()); // Usa {} para el log
        log.info("filter getPlayers - position: {}", filter.position()); // Usa {} para el log

        Specification<Player> spec = Specification.where(PlayerSpecifications.hasTeam(filter.team()))
                .or(PlayerSpecifications.hasPosition(filter.position()));
        

        List<Player> players = playerRepository.findAll(spec);
        log.info("spec: {}", spec.toString()); // Usa {} para el log

        return playerMapper.toListPlayerDTO(players);
    }
}


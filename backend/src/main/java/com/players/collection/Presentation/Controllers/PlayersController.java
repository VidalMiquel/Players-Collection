package com.players.collection.Presentation.Controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.players.collection.Application.Services.PlayerService;
import com.players.collection.Domain.DTO.PlayerDTO;
import com.players.collection.Domain.DTO.PlayerFilterDTO;



@RestController
public class PlayersController {

    private static final Logger log = LoggerFactory.getLogger(PlayersController.class);


    @Autowired
    private PlayerService playerService;

    @GetMapping("/")
    public List<PlayerDTO> getPlayers(PlayerFilterDTO playerFilterDTO) {
        log.info("position: {}", playerFilterDTO.position());
        log.info("team: {}", playerFilterDTO.team());
        return playerService.getPlayers(playerFilterDTO);
    }
    

}

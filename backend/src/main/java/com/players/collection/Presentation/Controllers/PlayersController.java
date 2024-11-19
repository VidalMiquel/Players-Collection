package com.players.collection.Presentation.Controllers;

import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.players.collection.Application.Services.PlayerService;
import com.players.collection.Domain.DTO.PlayerDTO;
import com.players.collection.Domain.Filter.PlayerFilter;
import com.players.collection.config.JwtAuthFilter;



@RestController
public class PlayersController {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);


    @Autowired
    private PlayerService playerService;

    @GetMapping("messages")
    public ResponseEntity<List<String>> messages() {
        return ResponseEntity.ok(Arrays.asList(
            "first", "second"
        ));
    }

    @GetMapping("/")
    public List<PlayerDTO> getPlayers(@ModelAttribute PlayerFilter filter) {
        log.info("filter2: ", filter);
        return playerService.getPlayers(filter);
    }
    

}

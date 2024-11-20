package com.players.collection.Application.Specifications;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import com.players.collection.Domain.Entities.Player;

public class PlayerSpecifications {

    private static final Logger log = LoggerFactory.getLogger(PlayerSpecifications.class);

    public static Specification<Player> hasTeam(String team) {
        log.info("inicial team: {}", team);
        return (root, query, criteriaBuilder) -> {
            if (team == null) {
                log.info("no team: {}", team);
                return criteriaBuilder.conjunction(); // No filtra si no hay equipo
            }
            log.info("team: {}", team);
            return criteriaBuilder.equal(root.get("team"), team);
        };
    }

    public static Specification<Player> hasPosition(String position) {
        return (root, query, criteriaBuilder) -> {
            if (position == null) {
                log.info("no position: {} ", position);
                return criteriaBuilder.conjunction(); // No filtra si no hay posición
            }
            log.info("position: {}", position);
            return criteriaBuilder.equal(root.get("position"), position);
        };
    }
}
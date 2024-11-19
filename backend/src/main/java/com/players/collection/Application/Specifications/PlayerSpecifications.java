package com.players.collection.Application.Specifications;

import org.springframework.data.jpa.domain.Specification;

import com.players.collection.Domain.Entities.Player;

public class PlayerSpecifications {

    public static Specification<Player> hasTeam(String team) {
        return (root, query, criteriaBuilder) -> {
            if (team == null) {
                return criteriaBuilder.conjunction(); // No filtra si no hay equipo
            }
            return criteriaBuilder.equal(root.get("team"), team);
        };
    }

    public static Specification<Player> hasPosition(String position) {
        return (root, query, criteriaBuilder) -> {
            if (position == null) {
                return criteriaBuilder.conjunction(); // No filtra si no hay posición
            }
            return criteriaBuilder.equal(root.get("position"), position);
        };
    }
}
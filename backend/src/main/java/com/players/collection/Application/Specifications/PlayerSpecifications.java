package com.players.collection.Application.Specifications;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import com.players.collection.Domain.Entities.Player;

import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.Predicate;

public class PlayerSpecifications {

    private static final Logger log = LoggerFactory.getLogger(PlayerSpecifications.class);

    public static Specification<Player> hasTeam(String team) {
        log.info("inicial team: {}", team);
        return (root, query, criteriaBuilder) -> {
            return team == null ? null : criteriaBuilder.equal(root.get("team"), team);
        };
    }

    public static Specification<Player> hasPosition(String position) {
        return (root, query, criteriaBuilder) -> {
            return position == null ? null : criteriaBuilder.equal(root.get("position"), position);
        };
    }

    public static Specification<Player> filterPalyer(String team, String position) {
        return (root, query, criteriaBuilder) -> {
            Predicate brandPredicate
                    = criteriaBuilder.like(root.get("team"), StringUtils.isBlank(team)
                            ? likePattern("") : team);
            Predicate namePredicate
                    = criteriaBuilder.like(root.get("position"), StringUtils.isBlank(position)
                            ? likePattern("") : position);
            return criteriaBuilder.and(namePredicate, brandPredicate);
        };
    }

    private static String likePattern(String value) {
        return "%" + value + "%";
    }

}

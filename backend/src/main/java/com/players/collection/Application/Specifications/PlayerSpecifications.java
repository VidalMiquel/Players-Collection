package com.players.collection.Application.Specifications;

import org.springframework.data.jpa.domain.Specification;

import com.players.collection.Domain.DTO.PlayerFilterDTO;
import com.players.collection.Domain.Entities.Player;

import io.micrometer.common.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;

public class PlayerSpecifications {

    public static Specification<Player> filterPlayer(PlayerFilterDTO filter) {
        return (root, query, criteriaBuilder) -> {
            Predicate teamPredicate = createLikePredicate(criteriaBuilder, root.get("team"), filter.team());
            Predicate positionPredicate = createLikePredicate(criteriaBuilder, root.get("position"), filter.position());
            Predicate nationalityPredicate = createLikePredicate(criteriaBuilder, root.get("nationality"), filter.nationality());

            return criteriaBuilder.and(teamPredicate, positionPredicate, nationalityPredicate);
        };
    }

    private static Predicate createLikePredicate(CriteriaBuilder criteriaBuilder, Path<String> path, String value) {
        return criteriaBuilder.like(path, StringUtils.isBlank(value) ? likePattern("") : value);
    }

    private static String likePattern(String value) {
        return "%" + value + "%";
    }

}

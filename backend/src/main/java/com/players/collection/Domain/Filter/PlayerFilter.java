package com.players.collection.Domain.Filter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PlayerFilter {
    private String team;
    private String position;

    // Getters y Setters
    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
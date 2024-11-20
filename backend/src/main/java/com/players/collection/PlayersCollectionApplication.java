package com.players.collection;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;

@SpringBootApplication(exclude= {UserDetailsServiceAutoConfiguration.class})
public class PlayersCollectionApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlayersCollectionApplication.class, args);
	}

}

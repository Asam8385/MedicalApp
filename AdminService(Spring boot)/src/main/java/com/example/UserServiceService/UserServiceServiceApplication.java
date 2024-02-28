package com.example.UserServiceService;

import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;


@SpringBootApplication
@EnableMongoRepositories
public class UserServiceServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserServiceServiceApplication.class, args);
	}


	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.authorizeRequests(authorizeRequests -> authorizeRequests.anyRequest()
				.permitAll())
				.csrf(AbstractHttpConfigurer::disable);


		return http.build();

	}

	@Bean
	public Jackson2ObjectMapperBuilderCustomizer customizer()
	{
		return builder -> builder.serializerByType(ObjectId.class,new ToStringSerializer());
	}









}

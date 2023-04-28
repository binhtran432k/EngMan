package io.github.engman.authentication.web;

import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthenticationResponse {
	private String username;
	private String firstName;
	private String lastName;
	private Set<? extends GrantedAuthority> roles;
	private String token;
}

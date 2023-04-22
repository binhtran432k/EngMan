package io.github.engman.authentication.web;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AuthenticationResponse {
	private String username;
	private String firstName;
	private String lastName;
	private List<? extends GrantedAuthority> roles;
	private String token;
}

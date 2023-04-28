package io.github.engman.authentication.web;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import jakarta.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest implements Serializable {

	private static final long serialVersionUID = -6986746375915710855L;

	@NotNull(message = "username.required")
	private String username;

	@NotNull(message = "password.required")
	private String password;

}

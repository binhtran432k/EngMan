package io.github.engman.authentication.web;

import static org.springframework.http.ResponseEntity.ok;

import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.engman.authentication.jwt.JwtTokenProvider;
import io.github.engman.user.User;
import io.github.engman.user.UserRole;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationManager authenticationManager;

	private final JwtTokenProvider jwtTokenProvider;

	@PostMapping()
	public ResponseEntity<EntityModel<AuthenticationResponse>> signin(@RequestBody AuthenticationRequest data) {
		return ok(EntityModel.of((authenticationAndResponse(data, false))));
	}

	@PostMapping("/admin")
	public ResponseEntity<EntityModel<AuthenticationResponse>> signinWithAdmin(
			@RequestBody AuthenticationRequest data) {
		return ok(EntityModel.of(authenticationAndResponse(data, true)));
	}

	@PostMapping("/refresh")
	public ResponseEntity<EntityModel<AuthenticationResponse>> signinWithAdmin() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ok(EntityModel.of(getAuthenticationResponse((User) authentication.getDetails())));
	}

	private AuthenticationResponse authenticationAndResponse(@RequestBody AuthenticationRequest data,
			boolean needAdmin) {
		try {
			String username = data.getUsername();
			var authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
			boolean hasRoleAdmin = authentication.getAuthorities().contains(UserRole.ROLE_ADMIN);
			if (needAdmin ^ hasRoleAdmin) {
				throw new BadCredentialsException("Bad Credentials");
			}
			return getAuthenticationResponse((User) authentication.getDetails());
		} catch (AuthenticationException e) {
			throw new BadCredentialsException("Invalid username/password supplied");
		}
	}

	private AuthenticationResponse getAuthenticationResponse(User user) {
		String token = jwtTokenProvider.createToken(user);
		return AuthenticationResponse.builder()
				.username(user.getUsername())
				.firstName(user.getFirstName())
				.lastName(user.getLastName())
				.token(token)
				.roles(user.getRoles())
				.build();
	}

}

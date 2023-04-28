package io.github.engman.authentication.web;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import io.github.engman.authentication.jwt.JwtTokenProvider;
import io.github.engman.core.exception.CustomException;
import io.github.engman.user.User;
import io.github.engman.user.UserRole;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final AuthenticationManager authenticationManager;

	private final JwtTokenProvider jwtTokenProvider;

	public AuthenticationResponse login(AuthenticationRequest request) {
		return authenticationAndResponse(request, false);
	}

	public AuthenticationResponse loginAsAdmin(AuthenticationRequest request) {
		return authenticationAndResponse(request, true);
	}

	public AuthenticationResponse refresh() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		return getAuthenticationResponse((User) authentication.getDetails());
	}

	private AuthenticationResponse authenticationAndResponse(AuthenticationRequest data,
			boolean needAdmin) {
		try {
			String username = data.getUsername();
			var authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
			boolean hasRoleAdmin = authentication.getAuthorities().contains(UserRole.ROLE_ADMIN);
			if (needAdmin ^ hasRoleAdmin) {
				throw new CustomException(HttpStatus.FORBIDDEN);
			}
			return getAuthenticationResponse((User) authentication.getDetails());
		} catch (AuthenticationException e) {
			throw new CustomException(HttpStatus.BAD_REQUEST);
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

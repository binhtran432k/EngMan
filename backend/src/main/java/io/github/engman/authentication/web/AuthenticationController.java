package io.github.engman.authentication.web;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;

	@PostMapping
	public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(authenticationService.login(request));
	}

	@PostMapping("/admin")
	public ResponseEntity<AuthenticationResponse> loginAsAdmin(
			@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(authenticationService.loginAsAdmin(request));
	}

	@PreAuthorize("isAuthenticated()")
	@PostMapping("/refresh")
	public ResponseEntity<AuthenticationResponse> refresh() {
		return ResponseEntity.ok(authenticationService.refresh());
	}

}

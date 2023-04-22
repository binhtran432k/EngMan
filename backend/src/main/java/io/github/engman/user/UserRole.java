package io.github.engman.user;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
	ROLE_ADMIN,
	ROLE_BASIC,
	ROLE_INSTRUCTOR,
	ROLE_ACADEMY;

	@Override
	public String getAuthority() {
		return name();
	}
}

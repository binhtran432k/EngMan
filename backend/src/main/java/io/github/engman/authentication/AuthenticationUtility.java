package io.github.engman.authentication;

import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

public class AuthenticationUtility {

	public static Authentication getAuthenticationWithUserDetails(Object principal, Object credentials,
			Collection<? extends GrantedAuthority> authorities, Object details) {
		var authenticationToken = new UsernamePasswordAuthenticationToken(principal, credentials, authorities);
		authenticationToken.setDetails(details);
		return authenticationToken;
	}

}

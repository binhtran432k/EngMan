package io.github.engman.authentication.jwt;

import static java.util.stream.Collectors.joining;

import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import io.github.engman.authentication.AuthenticationUtility;
import io.github.engman.authentication.MyUserDetails;
import io.github.engman.user.User;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {

	private static final String AUTHORITIES_KEY = "roles";
	private final MyUserDetails userDetails;

	/**
	 * TODO: store keys in config-server in microservices environment
	 */
	@Value("${security.jwt.token.secret-key:secret-key}")
	private String secretKey;
	@Value("${security.jwt.token.expire-length:3600000}")
	private long validityInMs;

	private Algorithm algorithm;

	@PostConstruct
	public void init() {
		var secret = Base64.getEncoder().encodeToString(this.secretKey.getBytes());
		this.algorithm = Algorithm.HMAC256(secret);
	}

	public String createToken(User user) {

		Date now = new Date();
		Date validity = new Date(now.getTime() + this.validityInMs);

		var jwt = JWT.create();
		return jwt
				.withSubject(user.getUsername())
				.withIssuedAt(now)
				.withExpiresAt(validity)
				.withClaim(AUTHORITIES_KEY,
						user.getRoles().stream().map(GrantedAuthority::getAuthority).collect(joining(",")))
				.withClaim("firstName", user.getFirstName())
				.withClaim("lastName", user.getLastName())
				.sign(this.algorithm);

	}

	public Authentication getAuthentication(String token) {
		try {
			DecodedJWT decodedJwt = JWT.require(this.algorithm).build().verify(token);
			// parseClaimsJws will check expiration date. No need do here.
			log.info("expiration date: {}", decodedJwt.getExpiresAt());

			var principal = userDetails.loadUserByUsername(decodedJwt.getSubject());

			return AuthenticationUtility.getAuthenticationWithUserDetails(principal.getUsername(), token,
					principal.getAuthorities(), principal);
		} catch (JWTVerificationException e) {
			log.error("Invalid JWT token: {}", e.getMessage());
		}
		return null;
	}

}

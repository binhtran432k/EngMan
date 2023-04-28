package io.github.engman.authentication;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import io.github.engman.authentication.jwt.JwtTokenAuthenticationFilter;
import io.github.engman.authentication.jwt.JwtTokenProvider;
import io.github.engman.core.exception.CustomException;

@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	SecurityFilterChain springWebFilterChain(HttpSecurity http,
			JwtTokenProvider tokenProvider) throws Exception {
		return http
				.cors(Customizer.withDefaults())
				.httpBasic(AbstractHttpConfigurer::disable)
				.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.exceptionHandling(c -> c.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
				.addFilterBefore(new JwtTokenAuthenticationFilter(tokenProvider),
						UsernamePasswordAuthenticationFilter.class)
				.build();
	}

	@Bean
	AuthenticationManager customAuthenticationManager(UserDetailsService userDetailsService, PasswordEncoder encoder) {
		return authentication -> {
			String username = authentication.getPrincipal().toString();
			String password = authentication.getCredentials().toString();

			UserDetails user = userDetailsService.loadUserByUsername(username);

			if (!encoder.matches(password, user.getPassword())) {
				throw new CustomException(HttpStatus.BAD_REQUEST);
			}

			if (!user.isEnabled()) {
				throw new CustomException(HttpStatus.NOT_FOUND);
			}

			return AuthenticationUtility.getAuthenticationWithUserDetails(username, null, user.getAuthorities(), user);
		};
	}

}

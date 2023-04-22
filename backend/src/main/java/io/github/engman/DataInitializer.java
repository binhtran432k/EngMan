package io.github.engman;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import io.github.engman.user.User;
import io.github.engman.user.UserRepository;
import io.github.engman.user.UserRole;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class DataInitializer {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@PostConstruct
	public void init() {
		initUsers();
	}

	private void initUsers() {
		log.info("start users initialization ...");

		final String defaultPassword = "12345678As";
		userRepository.deleteAll();
		userRepository.save(User.builder()
				.username("admin")
				.firstName("Ad")
				.lastName("Min")
				.password(passwordEncoder.encode(defaultPassword))
				.roles(Stream.of(UserRole.ROLE_ADMIN).collect(Collectors.toList()))
				.build());
		userRepository.save(User.builder()
				.username("student")
				.firstName("Stu")
				.lastName("Dent")
				.password(passwordEncoder.encode(defaultPassword))
				.roles(Stream.of(UserRole.ROLE_BASIC).collect(Collectors.toList()))
				.build());
		userRepository.save(User.builder()
				.username("instructor")
				.firstName("Inst")
				.lastName("Ructor")
				.password(passwordEncoder.encode(defaultPassword))
				.roles(Stream.of(UserRole.ROLE_BASIC, UserRole.ROLE_INSTRUCTOR).collect(Collectors.toList()))
				.build());
		userRepository.save(User.builder()
				.username("academy")
				.firstName("Aca")
				.lastName("Demy")
				.password(passwordEncoder.encode(defaultPassword))
				.roles(Stream.of(UserRole.ROLE_BASIC, UserRole.ROLE_ACADEMY).collect(Collectors.toList()))
				.build());
	}

}

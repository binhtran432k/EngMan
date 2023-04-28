package io.github.engman.user.web;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.engman.core.exception.CustomException;
import io.github.engman.user.User;
import io.github.engman.user.UserRepository;
import io.github.engman.user.UserRole;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	public User create(User user) {
		if (userRepository.existsByUsername(user.getUsername())) {
			throw new CustomException(HttpStatus.CONFLICT);
		}
		user.setPassword(passwordEncoder.encode(user.getRequestPassword()));
		return userRepository.save(user);
	}

}

package io.github.engman.core.exception;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CustomException extends RuntimeException {
	@Builder.Default
	HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
	String message;
	List<String> fieldErrors;

	public CustomException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}

	public CustomException(HttpStatus status) {
		this.status = status;
	}

	@Override
	public String getMessage() {
		return message != null ? message : status.name();
	}

	public Map<String, Object> toMap() {
		Map<String, Object> map = new HashMap<>();
		map.put("status", status.value());
		map.put("message", getMessage());
		if (fieldErrors != null) {
			map.put("fieldErrors", fieldErrors);
		}
		return map;
	}
}

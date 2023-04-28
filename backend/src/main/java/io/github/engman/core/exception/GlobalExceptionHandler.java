package io.github.engman.core.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(CustomException.class)
	public ResponseEntity<Map<String, Object>> handleCustomException(CustomException customException) {
		return new ResponseEntity<>(customException.toMap(), customException.getStatus());
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValidException(
			MethodArgumentNotValidException exception) {
		BindingResult result = exception.getBindingResult();
		var customException = CustomException.builder()
				.status(HttpStatus.BAD_REQUEST)
				.fieldErrors(
						result.getFieldErrors().stream().map((fieldError) -> fieldError.getDefaultMessage()).toList())
				.build();
		return new ResponseEntity<>(customException.toMap(), customException.getStatus());
	}
}

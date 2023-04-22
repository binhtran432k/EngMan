package io.github.engman.authentication.web;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthenticationResponseProcessor
		implements RepresentationModelProcessor<EntityModel<AuthenticationResponse>> {

	private final RepositoryRestConfiguration configuration;

	@Override
	public EntityModel<AuthenticationResponse> process(EntityModel<AuthenticationResponse> model) {
		AuthenticationController controller = WebMvcLinkBuilder.methodOn(AuthenticationController.class);
		String basePath = configuration.getBasePath().toString();
		return model;
	}
}

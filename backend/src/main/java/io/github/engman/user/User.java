package io.github.engman.user;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import io.github.engman.core.OnCreateValidation;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty(access = Access.READ_ONLY)
	Long id;

	@NotNull(groups = OnCreateValidation.class, message = "username.required")
	@Pattern(regexp = "^[A-Za-z0-9_-]{3,50}$", message = "username.missPattern#3,50")
	@Column(unique = true)
	private String username;

	@JsonIgnore
	private String password;

	@NotNull(groups = OnCreateValidation.class)
	@Size(min = 8, max = 50, message = "password.minMax#8,50")
	@JsonProperty(value = "password", access = Access.WRITE_ONLY)
	private String requestPassword;

	@Size(max = 50, message = "firstName.max#50")
	private String firstName;

	@Size(max = 50, message = "lastName.max#50")
	private String lastName;

	@Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "email.invalid")
	private String email;

	@Pattern(regexp = "^[0-9]{10}$", message = "phone.invalid")
	private String phone;

	@Enumerated(EnumType.STRING)
	private UserSex sex;

	private LocalDate dateOfBirth;

	@JsonProperty(access = Access.READ_ONLY)
	@Builder.Default
	private LocalDateTime createTime = LocalDateTime.now();

	@JsonProperty(access = Access.READ_ONLY)
	@Builder.Default
	private LocalDateTime updateTime = LocalDateTime.now();

	@ElementCollection(fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	@JsonProperty(access = Access.READ_ONLY)
	@Builder.Default
	private Set<UserRole> roles = Stream.of(UserRole.ROLE_BASIC).collect(Collectors.toSet());

	@Override
	@JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return roles;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	@JsonIgnore
	public boolean isEnabled() {
		return true;
	}

}

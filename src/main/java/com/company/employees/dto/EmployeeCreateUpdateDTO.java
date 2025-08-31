package com.company.employees.dto;

import jakarta.validation.constraints.*;

public record EmployeeCreateUpdateDTO(
        @NotBlank @Size(max = 100) String firstName,
        @NotBlank @Size(max = 100) String lastName,
        @NotBlank @Email @Size(max = 255) String email) {
}

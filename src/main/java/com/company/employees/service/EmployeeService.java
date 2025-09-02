package com.company.employees.service;

import com.company.employees.dto.EmployeeDTO;
import com.company.employees.dto.EmployeeCreateUpdateDTO;
import com.company.employees.model.Employee;
import com.company.employees.repo.EmployeeRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {
    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    public List<EmployeeDTO> listAll() {
        return repo.findAll().stream().map(this::toDTO).toList();
    }

    public EmployeeDTO getByEmail(String email) {
        return repo.findByEmail(email)
                .map(this::toDTO)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
    }

    @Transactional
    public EmployeeDTO create(EmployeeCreateUpdateDTO dto) {
        if (dto.id() != null) {
            throw new IllegalArgumentException("ID must not be provided when creating a new employee");
        }
        if (repo.existsByEmail(dto.email())) {
            throw new ConflictException("Email already exists");
        }
        Employee emp = Employee.builder()
                .firstName(dto.firstName())
                .lastName(dto.lastName())
                .email(dto.email())
                .build();
        try {
            return toDTO(repo.save(emp));
        } catch (DataIntegrityViolationException e) {
            throw new ConflictException("Email already exists");
        }
    }

    @Transactional
    public EmployeeDTO update(Long id, EmployeeCreateUpdateDTO dto) {
        if (!id.equals(dto.id())) {
            throw new IllegalArgumentException("ID in the path and body must match");
        }
        Employee emp = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Employee not found"));
        if (!emp.getEmail().equals(dto.email()) && repo.existsByEmail(dto.email())) {
            throw new ConflictException("Email already exists");
        }
        emp.setFirstName(dto.firstName());
        emp.setLastName(dto.lastName());
        emp.setEmail(dto.email());
        try {
            return toDTO(repo.save(emp));
        } catch (DataIntegrityViolationException e) {
            throw new ConflictException("Email already exists");
        }
    }

    private EmployeeDTO toDTO(Employee e) {
        return new EmployeeDTO(e.getId(), e.getFirstName(), e.getLastName(), e.getEmail());
    }

    // --- Exceptions ---
    public static class NotFoundException extends RuntimeException {
        public NotFoundException(String msg) {
            super(msg);
        }
    }

    public static class ConflictException extends RuntimeException {
        public ConflictException(String msg) {
            super(msg);
        }
    }
}

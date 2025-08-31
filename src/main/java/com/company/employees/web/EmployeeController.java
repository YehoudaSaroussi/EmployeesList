package com.company.employees.web;

import com.company.employees.service.EmployeeService;
import com.company.employees.dto.EmployeeDTO;
import com.company.employees.dto.EmployeeCreateUpdateDTO;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {
    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public List<EmployeeDTO> listAll() {
        return service.listAll();
    }

    @GetMapping("/by-email")
    public EmployeeDTO getByEmail(@RequestParam String email) {
        return service.getByEmail(email);
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> create(@Valid @RequestBody EmployeeCreateUpdateDTO dto) {
        EmployeeDTO created = service.create(dto);
        return ResponseEntity.created(URI.create("/api/employees/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public EmployeeDTO update(@PathVariable Long id, @Valid @RequestBody EmployeeCreateUpdateDTO dto) {
        return service.update(id, dto);
    }
}

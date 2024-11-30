// src/main/java/com/example/pagos/repositories/TransaccionRepository.java
package com.example.pagos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.pagos.models.Transaccion;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, Long> {
   Transaccion findBySessionId(String sessionId);
}
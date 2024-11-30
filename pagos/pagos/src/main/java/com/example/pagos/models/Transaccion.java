package com.example.pagos.models;

import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "transacciones")
public class Transaccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_boleto", nullable = false)
    private String idBoleto;
    
    @Column(nullable = false)
private LocalDateTime fechaTransaccion;

    @Column
    private String descripcion = "Sin descripción";

    @Column(nullable = false)
    private Float monto;

    @Column(nullable = false)
    private String estado; // PENDING, SUCCESS, FAILED

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(nullable = true)
    private String sessionId; // Stripe Checkout Session ID

    public Transaccion() {}

    @Column(nullable = false)
private LocalTime horaTransaccion;

public LocalTime getHoraTransaccion() {
    return horaTransaccion;
}

public void setHoraTransaccion(LocalTime horaTransaccion) {
    this.horaTransaccion = horaTransaccion;
}

@Column(nullable = false)
private String metodoPago;

public String getMetodoPago() {
    return metodoPago;
}

public void setMetodoPago(String metodoPago) {
    this.metodoPago = metodoPago;
}
    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Float getMonto() {
        return monto;
    }

    public void setMonto(Float monto) {
        this.monto = monto;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getIdBoleto() {
        return idBoleto;
    }

    public void setIdBoleto(String idBoleto) {
        this.idBoleto = idBoleto;
    }

    public LocalDateTime getFechaTransaccion() {
        return fechaTransaccion;
    }

    public void setFechaTransaccion(LocalDateTime fechaTransaccion) {
        this.fechaTransaccion = fechaTransaccion;
    }
}

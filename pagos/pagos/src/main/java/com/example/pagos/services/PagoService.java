package com.example.pagos.services;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.pagos.models.Transaccion;
import com.example.pagos.repositories.TransaccionRepository;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.transaction.Transactional;

@Service
public class PagoService {
    private static final Logger log = LoggerFactory.getLogger(PagoService.class);
    private final TransaccionRepository transaccionRepository;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    public PagoService(TransaccionRepository transaccionRepository) {
        this.transaccionRepository = transaccionRepository;
    }

    public Session crearSesionStripe(Transaccion transaccion) throws Exception {
        Stripe.apiKey = stripeApiKey;
        log.info("Creando sesión de Stripe para transacción");

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:4200/cancel")
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount((long) (transaccion.getMonto() * 100))
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(transaccion.getDescripcion() != null ? 
                                                                        transaccion.getDescripcion() : "Producto sin nombre")
                                                                .build()
                                                )
                                                .build()
                                )
                                .build()
                )
                .build();

        Session session = Session.create(params);
        log.info("Sesión de Stripe creada con ID: {}", session.getId());

        transaccion.setEstado("APPROVED");
        transaccion.setFechaCreacion(LocalDateTime.now());
        transaccion.setSessionId(session.getId());
        transaccionRepository.save(transaccion);
        log.info("Transacción guardada con estado APPROVE");

        return session;
    }

    @Transactional
    public void actualizarEstadoTransaccion(String sessionId, String estado) {
        log.info("Actualizando estado de transacción. SessionID: {}, Nuevo estado: {}", sessionId, estado);
        
        try {
            Transaccion transaccion = transaccionRepository.findBySessionId(sessionId);
            
            if (transaccion != null) {
                transaccion.setEstado(estado);
                transaccion = transaccionRepository.save(transaccion);
                log.info("Estado de transacción actualizado exitosamente. ID: {}, Nuevo estado: {}", 
                    transaccion.getId(), transaccion.getEstado());
            } else {
                log.error("No se encontró la transacción con sessionId: {}", sessionId);
                throw new RuntimeException("Transacción no encontrada para el sessionId: " + sessionId);
            }
        } catch (Exception e) {
            log.error("Error al actualizar estado de transacción: {}", e.getMessage());
            throw new RuntimeException("Error al actualizar estado de transacción", e);
        }
    }

    // Método adicional para verificar el estado de una sesión
    public String verificarEstadoSesion(String sessionId) {
        try {
            Stripe.apiKey = stripeApiKey;
            Session session = Session.retrieve(sessionId);
            log.info("Estado de sesión Stripe: {}", session.getPaymentStatus());
            return session.getPaymentStatus();
        } catch (Exception e) {
            log.error("Error al verificar estado de sesión: {}", e.getMessage());
            throw new RuntimeException("Error al verificar estado de sesión", e);
        }
    }
}
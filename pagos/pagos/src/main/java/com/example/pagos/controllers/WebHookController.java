package com.example.pagos.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pagos.services.PagoService;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;

@RestController
@RequestMapping("/webhook")
public class WebHookController {
   private static final Logger log = LoggerFactory.getLogger(WebHookController.class);
   private final PagoService pagoService;

   @Value("${stripe.webhook.secret}")
   private String endpointSecret;

   public WebHookController(PagoService pagoService) {
       this.pagoService = pagoService;
   }

   @PostMapping
   public ResponseEntity<String> handleWebhook(
           @RequestBody String payload,
           @RequestHeader("Stripe-Signature") String sigHeader) {
       try {
           log.info("Recibido webhook de Stripe");
           Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
           log.info("Evento verificado: {}", event.getType());

           if ("checkout.session.completed".equals(event.getType())) {
               Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
               if (session != null) {
                   pagoService.actualizarEstadoTransaccion(session.getId(), "SUCCESS");
                   log.info("Pago completado exitosamente");
               }
           } else if ("checkout.session.expired".equals(event.getType())) {
               Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
               if (session != null) {
                   pagoService.actualizarEstadoTransaccion(session.getId(), "FAILED");
                   log.info("Pago expirado/fallido");
               }
           }
           
           return ResponseEntity.ok("Webhook procesado correctamente");
       } catch (Exception e) {
           log.error("Error procesando webhook: {}", e.getMessage());
           return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                   .body("Error procesando webhook: " + e.getMessage());
       }
   }
}

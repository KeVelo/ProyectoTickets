package com.example.pagos.controllers;

import com.example.pagos.models.Transaccion;
import com.example.pagos.services.PagoService;
import com.stripe.model.checkout.Session;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

 @PostMapping("/crear")
public ResponseEntity<Map<String, String>> crearPago(@RequestBody Transaccion transaccion) {
    try {
        // Asignar un valor a id_boleto si no viene en la solicitud
        if (transaccion.getIdBoleto() == null) {
            transaccion.setIdBoleto("BOLETO-" + UUID.randomUUID().toString());
        }

        Session session = pagoService.crearSesionStripe(transaccion);
        Map<String, String> response = new HashMap<>();
        response.put("sessionId", session.getId());
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
    }
}

}

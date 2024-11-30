package com.example.pagos.config;

import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class StripeConfig {

    // Inyecta la clave de Stripe desde application.properties
    @Value("${stripe.api.key}")
    private String stripeApiKey;

    // Método que se ejecuta automáticamente después de construir la clase
    @PostConstruct
    public void init() {
        // Configura Stripe con la clave de la API
        Stripe.apiKey = stripeApiKey;
    }
}
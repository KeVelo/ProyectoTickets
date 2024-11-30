import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { loadStripe } from '@stripe/stripe-js';
import { BoletosService } from 'src/app/services/boletos.service';

@Component({
 selector: 'app-proceso-compra',
 templateUrl: './proceso-compra.component.html',
 styleUrls: ['./proceso-compra.component.css']
})
export class ProcesoCompraComponent implements OnInit {
 concierto: any;
 localidadSeleccionada: string = '';
 cantidadBoletos: number = 1;
 precioBase: number = 0;
 

 // Variables para el modal
 showModal: boolean = false;
 modalTitle: string = '';
 modalMessage: string = '';

 private stripe: any;

 constructor(private router: Router, private paymentService: PaymentService, private boletosService: BoletosService ) {
   this.initStripe();
   const navigation = this.router.getCurrentNavigation();
   const state = navigation?.extras.state as {
     concierto: any;
     localidadSeleccionada: string;
     precioLocalidad: number;
     cantidadBoletos: number;
     
   };

   if (state) {
     this.concierto = state.concierto;
     this.localidadSeleccionada = state.localidadSeleccionada;
     this.cantidadBoletos = state.cantidadBoletos;
     this.precioBase = state.precioLocalidad;
   }
 }

 private async initStripe() {
   this.stripe = await loadStripe('pk_test_51QL9pYCxXPXEVjkrIXptc0WeMeU6k8EsJFtF2U4LifiUJOBJYvZgZnXNYppIXfdT6bv3g7QDJVtNgUaplVuqn8v600m5AAk3N9');
 }

 ngOnInit(): void {}

 async procesarCompra(): Promise<void> {
  if (!this.stripe) {
    console.error('Stripe no inicializado');
    return;
  }

  try {
    // Ejecutar simultáneamente el pago y la creación del boleto
    await this.crearBoletoInvalid();

    const paymentData = {
      idBoleto: this.concierto.id_concierto.toString(),
      monto: this.cantidadBoletos * this.precioBase,
      estado: "PENDING",
      fechaCreacion: new Date().toISOString(),
      fechaTransaccion: new Date().toISOString(),
      horaTransaccion: new Date().toLocaleTimeString(),
      metodoPago: "Tarjeta de Crédito"
    };

    const session = await this.paymentService.createPaymentSession(paymentData).toPromise();
    console.log('Sesión creada:', session);

    const { error } = await this.stripe.redirectToCheckout({
      sessionId: session.sessionId
    });

    if (error) {
      throw error;
    }

  } catch (error) {
    console.error('Error en el proceso de compra:', error);
    this.showModal = true;
    this.modalTitle = 'Error en la compra';
    this.modalMessage = 'Error al procesar el pago o crear el boleto.';
  }
}

 async crearBoletoInvalid(): Promise<void> {
  try {
    // Mapear localidad seleccionada a su ID numérico
    const localidades: { [key: string]: number } = { PLATINUM: 1, VIP: 2, GENERAL: 3 };
    const localidadId = localidades[this.localidadSeleccionada.toUpperCase() as keyof typeof localidades];

    // Crear el objeto para el boleto
    const boletoData = {
      id_concierto: this.concierto.id_concierto,
      id_localidad: localidadId,
      cantidad_boletos: this.cantidadBoletos,
      precio_final: this.cantidadBoletos * this.precioBase,
      status: 'invalid', // Estado inicial del boleto
    };

    console.log('Enviando datos al endpoint de creación de boleto:', boletoData);

    // Llamar al servicio para crear el boleto
    const boleto = await this.boletosService.crearBoleto(boletoData).toPromise();
    console.log('Boleto creado:', boleto);

    this.showModal = true;
    this.modalTitle = 'Boleto Creado';
    this.modalMessage = 'El boleto ha sido creado.';
  } catch (error) {
    console.error('Error al crear el boleto:', error);
    this.showModal = true;
    this.modalTitle = 'Error';
    this.modalMessage = 'Hubo un error al crear el boleto. Intenta de nuevo.';
  }
}


 editarCompra(): void {
   if (this.concierto && this.concierto.id_concierto) {
     this.router.navigate(['/seleccion', this.concierto.id_concierto], {
       state: {
         concierto: this.concierto,
         localidadSeleccionada: this.localidadSeleccionada,
         cantidadBoletos: this.cantidadBoletos,
       },
     });
   } else {
     console.error('No se pudo redirigir a la selección de boletos: ID de concierto no encontrado.');
   }
 }

 cancelarCompra(): void {
   this.showModal = true;
   this.modalTitle = 'Compra Cancelada';
   this.modalMessage = 'Has cancelado la compra. Regresando al inicio.';

   setTimeout(() => {
     this.closeModal();
     this.router.navigate(['/']);
   }, 3000);
 }

 closeModal(): void {
   this.showModal = false;
 }

 getImagenTopPorId(idConcierto: number): string | null {
   switch (idConcierto) {
    case 37:
      return 'assets/carrusel/artic_monkeys.jpg';
    case 38:
      return 'assets/carrusel/metallica.jpg';
    case 39:
      return 'assets/carrusel/karolg.jpg';
    case 40:
      return 'assets/carrusel/luis.jpg';
    case 32:
      return 'assets/carrusel/cas.jpg';
    case 33:
      return 'assets/carrusel/aespa.jpg';
    case 34:
      return 'assets/carrusel/stray.jpg';
    case 35:
      return 'assets/carrusel/mcr.jpg';
    case 36:
      return 'assets/carrusel/1975.jpg';
    default:
      return 'assets/concierto2.jpg'; 
   }
 }

 getImagenPorId(idConcierto: number): string {
  switch (idConcierto) {
    case 37:
      return 'assets/concierto-carrusel/artic_monkeys.jpg';
    case 38:
      return 'assets/concierto-carrusel/metallica.jpg';
    case 39:
      return 'assets/concierto-carrusel/karolg.jpg';
    case 40:
      return 'assets/concierto-carrusel/luis.jpg';
    case 32:
      return 'assets/concierto-carrusel/cas.jpg';
    case 33:
      return 'assets/concierto-carrusel/aespa.jpg';
    case 34:
      return 'assets/concierto-carrusel/stray.jpg';
    case 35:
      return 'assets/concierto-carrusel/mcr.jpg';
    case 36:
      return 'assets/concierto-carrusel/1975.jpg';
    default:
      return 'assets/concierto2.jpg'; // Retornar una imagen predeterminada si no hay una asociada
  }
}
}

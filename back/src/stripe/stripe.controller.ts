import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Headers,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './dto/create.checkoutSession.dto';
import { log } from 'console';
import e from 'express';
import { pairwise } from 'rxjs';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create')
  @UsePipes()
  async createCheckoutSession(
    @Body()
    body: CreateCheckoutSessionDto,
  ) {
    try {
      const { amount, currency, email } = body;
      const session = await this.stripeService.createCheckoutSession(
        amount,
        currency,
        email,
      );
      return { checkoutUrl: session.url };
    } catch (error) {
      throw new HttpException('Error al crear la session, puede que el correo no esté registrado', 400);
    }
  }
  @Get('success')
  success() {
    return {
      message: 'Pago realizado exitosamente. Gracias por tu donación.',
    };
  }

  @Get('cancel')
  cancel() {
    return {
      message: 'El pago fue cancelado. Vuelve a intentarlo.',
    };
  }

  @Post('webhook')
  async handleWebhoook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request,
  ) {
    
    const payload = req.body  //esto me envia Stripe y  lo transformo en binario 
    
    if (!Buffer.isBuffer(payload)) {
        throw new HttpException('El cuerpo no es un Buffer crudo', HttpStatus.BAD_REQUEST);
      }

    try {
      const event = await this.stripeService.verifyWebhook(payload, signature);
      
      await this.stripeService.processEvent(event);
      return { received: true };
      
    } catch (err) {
      throw new HttpException(`Error ${err}`, HttpStatus.BAD_REQUEST);
    }
  }
}

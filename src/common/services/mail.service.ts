import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private resend: Resend;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('RESEND_API_KEY');
        this.resend = new Resend(apiKey);
    }

    async sendVerificationCode(email: string, code: string) {
        try {
            const { data, error } = await this.resend.emails.send({
                from: 'Wuarike <onboarding@resend.dev>', // Usando el dominio de prueba por defecto
                to: [email],
                subject: 'Tu código de verificación de Wuarike',
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2>¡Bienvenido a Wuarike!</h2>
                        <p>Gracias por unirte a nosotros. Para activar tu cuenta, ingresa el siguiente código en la aplicación:</p>
                        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                            ${code}
                        </div>
                        <p>Este código expirará en breve. Si no solicitaste este correo, puedes ignorarlo con seguridad.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p style="font-size: 12px; color: #888;">&copy; ${new Date().getFullYear()} Wuarike - Descubre los mejores sabores.</p>
                    </div>
                `,
            });

            if (error) {
                console.error('Error enviando email con Resend:', error);
                throw new InternalServerErrorException('Error al enviar el correo de verificación');
            }

            return data;
        } catch (error) {
            console.error('Error en MailService:', error);
            throw new InternalServerErrorException('Error al procesar el envío del correo');
        }
    }
}

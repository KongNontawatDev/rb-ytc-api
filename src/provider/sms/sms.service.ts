import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SmsService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.havesms.com', // URL ของ Sms API
      timeout: 5000,
    });
  }

  async sendSms(to: string, message: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/send', {
        to,
        message,
        apiKey: 'YOUR_API_KEY', // ใส่ API Key ของคุณ
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'SMS sending failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

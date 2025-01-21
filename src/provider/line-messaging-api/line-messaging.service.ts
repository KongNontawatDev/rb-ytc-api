import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class LineMessagingService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.line.me/v2/bot/message',
      headers: {
        Authorization: `Bearer ULA/AkKAYmb4Gg9qj4xdnk5hSBgg7wSV8EWPleMkZVTa1hfpW10yFXg2xmxVHD2tldu2JTNS5cKvERF6DdGa8nA4qMZ4rRHpfzEPM1bQ9wKba8ykhFe9Pv8lgcyjDvWr4acogHnmTY48bBjAVDQsFAdB04t89/1O/w1cDnyilFU=`,
        'Content-Type': 'application/json',
      },
    });
  }

  async pushMessage(to: string, messages: any[]): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/push', {
        to,
        messages,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      
      throw new HttpException(
        error.response?.data || 'LINE API Error',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async replyMessage(replyToken: string, messages: any[]): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/reply', {
        replyToken,
        messages,
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'LINE API Error',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  createTemplateMessage(
    altText: string,
    template: Record<string, any>,
  ): Record<string, any> {
    return {
      type: 'template',
      altText,
      template,
    };
  }
}

import { Controller, All, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

@Controller()
export class GatewayController {
    @All('*')
    async proxy(@Req() req: Request, @Res() res: Response) {
        const originalUrl = req.originalUrl;
        let targetUrl = '';

        // Use environment variables with defaults.
        // In Docker, you might set these to the container names.
        // In local test environment, set them to "localhost".
        const catalogHost = process.env.CATALOG_SERVICE_HOST || 'catalog-service';
        const orderHost = process.env.ORDER_SERVICE_HOST || 'order-service';

        if (originalUrl.startsWith('/catalog')) {
            targetUrl = `http://${catalogHost}:3001${originalUrl.replace('/catalog', '')}`;
        } else if (originalUrl.startsWith('/orders')) {
            targetUrl = `http://${orderHost}:3002${originalUrl.replace('/orders', '')}`;
        } else {
            return res.status(404).send('Not Found');
        }

        try {
            let axiosResponse: AxiosResponse;
            const method = req.method.toLowerCase();

            if (method === 'get') {
                axiosResponse = await axios.get(targetUrl);
            } else if (method === 'post') {
                axiosResponse = await axios.post(targetUrl, req.body);
            } else if (method === 'put') {
                axiosResponse = await axios.put(targetUrl, req.body);
            } else if (method === 'delete') {
                axiosResponse = await axios.delete(targetUrl);
            } else {
                throw new Error(`Method ${req.method} not supported by the gateway`);
            }

            res.status(axiosResponse.status).send(axiosResponse.data);
        } catch (error: any) {
            res.status(error.response?.status || 500).send(error.response?.data || error.message);
        }
    }
}

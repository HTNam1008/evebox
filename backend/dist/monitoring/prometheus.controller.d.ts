import { Response } from 'express';
import { PrometheusService } from './prometheus.service';
export declare class PrometheusController {
    private readonly prometheusService;
    constructor(prometheusService: PrometheusService);
    getMetrics(res: Response): Promise<void>;
}

import { Entity } from '@loopback/repository';
export declare class InsightReport extends Entity {
    insightReportId?: string;
    reportName: string;
    reportFrom?: string;
    reportTill?: string;
    vehicleType?: string;
    reportUrl?: string;
    status: string;
    createdAt?: Date;
    userId: string;
    [prop: string]: any;
    constructor(data?: Partial<InsightReport>);
}
export interface InsightReportRelations {
}
export type InsightReportWithRelations = InsightReport & InsightReportRelations;

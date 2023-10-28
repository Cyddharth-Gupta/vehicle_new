import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { InsightReport } from '../models';
import { InsightReportRepository } from '../repositories';
export declare class InsightReportController {
    insightReportRepository: InsightReportRepository;
    constructor(insightReportRepository: InsightReportRepository);
    create(insightReport: InsightReport): Promise<InsightReport>;
    count(where?: Where<InsightReport>): Promise<Count>;
    find(filter?: Filter<InsightReport>): Promise<InsightReport[]>;
    updateAll(insightReport: InsightReport, where?: Where<InsightReport>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<InsightReport>): Promise<InsightReport>;
    updateById(id: string, insightReport: InsightReport): Promise<void>;
    replaceById(id: string, insightReport: InsightReport): Promise<void>;
    deleteById(id: string): Promise<void>;
}

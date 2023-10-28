import { InsightReport, User } from '../models';
import { InsightReportRepository } from '../repositories';
export declare class InsightReportUserController {
    insightReportRepository: InsightReportRepository;
    constructor(insightReportRepository: InsightReportRepository);
    getUser(id: typeof InsightReport.prototype.insightReportId): Promise<User>;
}

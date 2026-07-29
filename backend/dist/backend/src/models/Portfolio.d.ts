import mongoose, { Document } from 'mongoose';
import type { IPortfolio } from '@shared/types/portfolio';
export interface IPortfolioDocument extends Omit<IPortfolio, '_id'>, Document {
}
export declare const Portfolio: mongoose.Model<IPortfolioDocument, {}, {}, {}, mongoose.Document<unknown, {}, IPortfolioDocument, {}, {}> & IPortfolioDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Portfolio.d.ts.map
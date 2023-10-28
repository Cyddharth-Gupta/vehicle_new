import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class WeighingbridgedbDataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string;
    };
    constructor(dsConfig?: object);
}

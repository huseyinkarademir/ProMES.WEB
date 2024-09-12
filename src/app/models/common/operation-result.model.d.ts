export declare enum OperationResult {
    Error = 0,
    Success = 1,
    Warning = 2
}

export declare class OperationResult {
    OperationStatus: OperationStatus
    readonly OperationMessage: string
    
    constructor(OperationStatus: OperationStatus, OperationMessage: OperationMessage);
}
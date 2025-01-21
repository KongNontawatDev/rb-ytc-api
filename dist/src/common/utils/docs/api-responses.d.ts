export declare const commonApiResponses: {
    success: (example?: object, meta?: boolean) => MethodDecorator & ClassDecorator;
    created: (example?: object) => MethodDecorator & ClassDecorator;
    badRequest: MethodDecorator & ClassDecorator;
    notFound: MethodDecorator & ClassDecorator;
    conflict: MethodDecorator & ClassDecorator;
    unauthorized: MethodDecorator & ClassDecorator;
    forbidden: MethodDecorator & ClassDecorator;
};
export declare const createApiBody: (required: string[], properties: Record<string, any>) => MethodDecorator;
export declare const createApiParam: (name: string, type: any, description: string) => MethodDecorator & ClassDecorator;
export declare const createCommonApiResponses: (successExample: any, isAuth?: boolean, isPermission?: boolean, isMeta?: boolean) => (MethodDecorator & ClassDecorator)[];

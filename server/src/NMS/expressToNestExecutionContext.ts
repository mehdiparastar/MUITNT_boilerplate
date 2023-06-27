import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ExpressToNestExecutionContext = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response,
      }),
    };
  },
);

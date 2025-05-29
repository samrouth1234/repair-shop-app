import { type NextRequest, NextResponse } from "next/server";
import { inspect } from "node:util";

import { HttpStatus } from "@/constants/http-status";

/**
 * Configuration options for creating an API error
 * @param message Human-readable error message
 * @param status HTTP status code for the error
 * @param meta Optional metadata for the API response
 * @param log Optional metadata for logging only
 */
type ApiErrorOptions = {
  message: string;
  status: number;
  meta?: Record<string, unknown>;
  log?: Record<string, unknown>;
};

/**
 * Base error class for handling API errors with status codes and metadata
 * @param options Configuration for creating the error
 * @param options.message Human-readable error message
 * @param options.status HTTP status code for the error
 * @param options.meta Optional metadata for the API response
 * @param options.log Optional metadata for logging only
 *
 * @example
 * throw new ApiError({
 *   message: "Invalid input",
 *   status: HttpStatus.BAD_REQUEST,
 *   meta: { field: "email" }
 * });
 */
export class ApiError extends Error {
  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = this.constructor.name;
    this.status = options.status;
    this.meta = options.meta;
    this.log = options.log;
  }

  status: number;
  meta?: Record<string, unknown>;
  log?: Record<string, unknown>;
}

/**
 * Options for customizing error responses
 * @param message Custom error message
 * @param meta Additional metadata for the response
 * @param log Additional data for logging
 */
type ErrorOptions = {
  message?: string;
  meta?: Record<string, unknown>;
  log?: Record<string, unknown>;
};

/**
 * Creates a specialized error class extending ApiError
 * @param name Error class name
 * @param defaultMessage Default message if none provided
 * @param status HTTP status code
 */
const createErrorClass = (
  name: string,
  defaultMessage: string,
  status: number,
) => {
  return class extends ApiError {
    constructor(messageOrOptions: string | ErrorOptions = defaultMessage) {
      const options =
        typeof messageOrOptions === "string"
          ? { message: messageOrOptions }
          : messageOrOptions;

      super({
        message: options.message || defaultMessage,
        status,
        meta: options.meta,
        log: options.log,
      });
      this.name = name;
    }
  };
};

export const BadRequestException = createErrorClass(
  "BadRequestException",
  "Bad Request",
  HttpStatus.BAD_REQUEST,
);

export const UnauthorizedException = createErrorClass(
  "UnauthorizedException",
  "Unauthorized",
  HttpStatus.UNAUTHORIZED,
);

export const ForbiddenException = createErrorClass(
  "ForbiddenException",
  "Forbidden",
  HttpStatus.FORBIDDEN,
);

export const NotFoundException = createErrorClass(
  "NotFoundException",
  "Not Found",
  HttpStatus.NOT_FOUND,
);

export const TooManyRequestsException = createErrorClass(
  "TooManyRequestsException",
  "Too Many Requests",
  HttpStatus.TOO_MANY_REQUESTS,
);

export const InternalServerErrorException = createErrorClass(
  "InternalServerErrorException",
  "Internal Server Error",
  HttpStatus.INTERNAL_SERVER_ERROR,
);

export const ConflictException = createErrorClass(
  "ConflictException",
  "Conflict",
  HttpStatus.CONFLICT,
);

type ApiResponseOptions = {
  status?: number;
  headers?: HeadersInit;
};

/**
 * Handles API errors and converts them to HTTP responses
 * @param error The error to handle
 * @param options Response configuration options
 */
export function HandleApiError(
  error: unknown,
  options: ApiResponseOptions = {},
) {
  // Pretty print the error object with full array expansion
  console.error(
    "API Error:",
    inspect(error, {
      depth: null,
      colors: true,
      maxArrayLength: null,
      compact: false,
      breakLength: 80,
    }),
  );

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        ...(error.meta || {}),
      },
      {
        status: error.status,
        headers: options.headers,
      },
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: "An unexpected error occurred",
    },
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      headers: options.headers,
    },
  );
}

// Define the base params type
type RouteParams = Record<string, string | string[]>;

// Define the context types for both handler and wrapper
type HandlerContext<TParams extends RouteParams> = {
  params: TParams;
};

// Define the wrapper context type
type WrapperContext<TParams extends RouteParams> = {
  params: Promise<TParams>;
};

// Define the handler type
type ApiHandler<TRequest, TParams extends RouteParams> = (
  req: TRequest,
  context: HandlerContext<TParams>,
) => Promise<Response>;

/**
 * Wraps an API route handler with error handling functionality
 * @function apiHandler
 * @template TRequest - The request type (Request | NextRequest)
 * @template TParams - The route parameters type extending RouteParams
 * @param {ApiHandler<TRequest, TParams>} handler - The route handler function
 * @returns {Function} A wrapped handler function with error handling
 *
 * @example
 * export const GET = apiHandler(async (req, context) => {
 *   // Your route logic here
 *   return NextResponse.json({ data: "success" });
 * });
 */
export function apiHandler<
  TRequest = Request | NextRequest,
  TParams extends RouteParams = RouteParams,
>(
  handler: ApiHandler<TRequest, TParams>,
): (req: TRequest, context: WrapperContext<TParams>) => Promise<Response> {
  return async (req, context) => {
    try {
      const resolvedContext = {
        params: await context.params,
      };

      const response = await handler(req, resolvedContext);
      return response;
    } catch (error) {
      return HandleApiError(error);
    }
  };
}

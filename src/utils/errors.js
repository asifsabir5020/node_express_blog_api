import { StatusCodes } from 'http-status-codes'

export class NotFoundError extends Error {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.NOT_FOUND
    }
  }
  
export class UnAuthenticatedError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export class UnAuthorizedError extends Error {
  constructor(message) {
    super(message || `You don't have the permissions for this operation`)
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
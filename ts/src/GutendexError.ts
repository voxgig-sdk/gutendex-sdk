
import { Context } from './Context'


class GutendexError extends Error {

  isGutendexError = true

  sdk = 'Gutendex'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  GutendexError
}


-- Gutendex SDK error

local GutendexError = {}
GutendexError.__index = GutendexError


function GutendexError.new(code, msg, ctx)
  local self = setmetatable({}, GutendexError)
  self.is_sdk_error = true
  self.sdk = "Gutendex"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function GutendexError:error()
  return self.msg
end


function GutendexError:__tostring()
  return self.msg
end


return GutendexError

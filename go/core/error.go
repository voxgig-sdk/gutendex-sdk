package core

type GutendexError struct {
	IsGutendexError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewGutendexError(code string, msg string, ctx *Context) *GutendexError {
	return &GutendexError{
		IsGutendexError: true,
		Sdk:              "Gutendex",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *GutendexError) Error() string {
	return e.Msg
}

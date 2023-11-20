import errorCodes from "../dictionaries/errorCodes";
import ErrorsDictionary from "../dictionaries/errorsDictionary";

const newErrorsForDictionary = [];

export default ErrorHandler = (error, req, res, next) => {
  const customError = new Error();
  const knownError = ErrorsDictionary[error.name];

  if (knownError) {
    customError.name = knownError;
    customError.message = error.message;
    customError.code = errorCodes[knownError];
    next(customError);
  } else {
    generateNewError(error);
    next(error);
  }
};

// Genera un nuevo error, para luego ser guardado en el diccionario una vez customizado por el desarrollador
const generateNewError = (error) => {
  const newError = {
    name: error.name,
    message: error.message,
    stack: error.stack,
  };
  newErrorsForDictionary.push(newError);
  return newError;
};

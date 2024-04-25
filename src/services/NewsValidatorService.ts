import {
    INVALID_DATE_ERROR,
    MUST_BE_STRING_ERROR,
    REQUIRED_FIELD_ERROR,
    ValidationError
} from "../errors/validationError";
import {NewsCreateInput} from "../types/newsTypes";


export class NewsValidatorService {
    static validateCreate(newsCreateInput: any): NewsCreateInput {
        const errors: ValidationError[] = [];

        if (!newsCreateInput.title) {
            errors.push(new ValidationError(REQUIRED_FIELD_ERROR, 'title'));
        } else if (typeof newsCreateInput.title !== 'string') {
            errors.push(new ValidationError(MUST_BE_STRING_ERROR, 'title'));
        }

        if (!newsCreateInput.description) {
            errors.push(new ValidationError(REQUIRED_FIELD_ERROR, 'description'));
        } else if (typeof newsCreateInput.description !== 'string') {
            errors.push(new ValidationError(MUST_BE_STRING_ERROR, 'description'));
        }

        if (!newsCreateInput.text) {
            errors.push(new ValidationError(REQUIRED_FIELD_ERROR, 'text'));
        } else if (typeof newsCreateInput.text !== 'string') {
            errors.push(new ValidationError(MUST_BE_STRING_ERROR, 'text'));
        }

        // Validate date if provided and must be a valid ISO string
        if (newsCreateInput.date) {
            if (typeof newsCreateInput.date !== 'string' || isNaN(Date.parse(newsCreateInput.date))) {
                errors.push(new ValidationError(INVALID_DATE_ERROR, 'date'));
            }
        }

        if (errors.length > 0) {
            throw errors;
        }

        return newsCreateInput as NewsCreateInput
    }
}
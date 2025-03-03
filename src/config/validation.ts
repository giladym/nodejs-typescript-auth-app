export const validators = {
    phoneNumber: (value: string) => validatorsRegex.phoneNumber.test(value),
    email: (value: string) => validatorsRegex.email.test(value),
    }

export const validatorsRegex = {
    phoneNumber: /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\(?\d{3}\)??[-.\s]?\(?\d{4}\)?$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
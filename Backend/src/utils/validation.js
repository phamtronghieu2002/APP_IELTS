const checkValidation = (validData,data) => {
    return validData.validateAsync(data, { abortEarly: false });
}
module.exports = {
    checkValidation
}
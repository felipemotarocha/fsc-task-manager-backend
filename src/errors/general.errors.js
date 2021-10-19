const notAllowedFieldsToUpdateError = (res) => {
    return res
        .status(500)
        .send("Um ou mais campos inseridos não são editáveis.");
};

module.exports = {
    notAllowedFieldsToUpdateError,
};

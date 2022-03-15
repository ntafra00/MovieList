export const validateEmail = (email) => {

    if (email) {
        return email.match(
            /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
        )
    }
    return true;
}

export const validateYear = (movieYear) => {
    return movieYear.match(/^(19[0-9][0-9])$|^(20[01][0-9])$|^(202[0-2])$/)
}

export const validateRate = (movieRate) => {
    return movieRate.match(/^([1-8]\.[0-9])$|^(9\.[0-2])$/);
}

export const clearInputs = (inputClass) => {
    let inputs = document.querySelectorAll(inputClass);

    for (let input of inputs)
        input.value = null;
}
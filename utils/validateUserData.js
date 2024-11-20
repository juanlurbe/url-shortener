import validator from "validator";

export const validateUserData = (data, isCreate = true) => {
    const { mail, name, pass } = data;
    const cleanedData = {};

    if (isCreate) {
        if (!mail || !name || !pass) {
            throw new Error("mail, nombre y pass son campos obligatorios");
        }
    }

    if (isCreate || mail !== undefined) {
        const trimmedMail = mail?.trim();
        if (!trimmedMail || !validator.isEmail(trimmedMail)) {
            throw new Error("El email no es válido o está vacío");
        }
    cleanedData.mail = trimmedMail;
    }

    if (isCreate || name !== undefined) {
        const trimmedName = name?.trim(); 
        if (!trimmedName || trimmedName.length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres y no puede estar vacío");
        }
     cleanedData.name = trimmedName;
    }

    if (isCreate || pass !== undefined) {
        const trimmedPass = pass?.trim(); 
        if (!trimmedPass || !validator.isLength(trimmedPass, { min: 4 })) {
            throw new Error("Pass debe tener al menos 4 caracteres y no puede estar vacío");
        }
    cleanedData.pass = trimmedPass;
    }

    return cleanedData;
};

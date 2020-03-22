export const genErrorObj = (code, status, message) => {
    return { success: false, code, status, message };
}
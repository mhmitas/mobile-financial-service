export function identifyInput(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.0-9]*$/;

    if (emailRegex.test(input)) {
        return 'email';
    } else if (phoneRegex.test(input)) {
        return 'number';
    } else {
        return 'invalid';
    }
}
export function parseExpiresIn(expiresIn: string): number {
    const unit = expiresIn.slice(-1); // Последний символ (d, h, m, s)
    const value = parseInt(expiresIn.slice(0, -1), 10); // Число

    switch (unit) {
        case 's': return value;          // Секунды
        case 'm': return value * 60;     // Минуты → секунды
        case 'h': return value * 3600;   // Часы → секунды
        case 'd': return value * 86400;  // Дни → секунды
        default: return 0;               // Если формат неверный
    }
}
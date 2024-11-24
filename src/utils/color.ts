export const ajustColor = (color: string, opacity: number): string => {
    // Verifica se a color é no formato RGBA
    if (color.startsWith("rgba")) {
        const rgba = color.match(/rgba?\((\d+), (\d+), (\d+), ([\d.]+)\)/);
        if (rgba) {
            const [, r, g, b, a] = rgba;
            const novaOpacidade = Math.max(0, Math.min(1, parseFloat(a) * opacity));
            return `rgba(${r}, ${g}, ${b}, ${novaOpacidade})`;
        }
    }

    if (color.startsWith("#")) {
        let hex = color.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        const novaOpacidade = Math.max(0, Math.min(1, opacity));

        return `rgba(${r}, ${g}, ${b}, ${novaOpacidade})`;
    }
    return color;
}


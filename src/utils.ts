import { ItemPedido } from "./data";

export const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

export const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleTimeString(undefined, options);
};

export const calculaTotalPedido = (items: ItemPedido[]) => {
    let valorTotal = 0;
    items.forEach(item => {
        const subtotal = item.instanciaItem.preco * item.quantidade;
        valorTotal += subtotal;
    });
    return valorTotal;
};


export const formatarEndereco = (rua: String, numero: number, complemento: String | null, cep: String, bairro: String, cidade: String, estado: String): string => {
    let enderecoFormatado = `${rua}, ${numero}`;

    if (complemento) {
        enderecoFormatado += `, ${complemento}`;
    }

    enderecoFormatado += `, ${bairro}, ${cep}, ${cidade} - ${estado}`;

    return enderecoFormatado;
};

export const truncateDescription = (description: string, maxLength: number): string => {
    if (description.length > maxLength) {
        return description.slice(0, maxLength - 3) + '...';
    }
    return description;
};

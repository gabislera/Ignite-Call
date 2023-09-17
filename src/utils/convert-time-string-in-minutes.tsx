// Esta função converte uma string no formato "hh:mm" em minutos totais.
// Por exemplo, "10:30" se tornaria 630 minutos (10 horas * 60 minutos + 30 minutos).

export function convertTimeStringToMinutes(timeString: string) {
  // Primeiro, dividimos a string usando ':' como separador, criando um array com duas partes: horas e minutos.
  const [hours, minutes] = timeString.split(':').map(Number)

  // Em seguida, multiplicamos as horas por 60 para convertê-las em minutos e somamos os minutos.
  // Isso nos dá o total de minutos representado pela string de tempo.
  return hours * 60 + minutes
}

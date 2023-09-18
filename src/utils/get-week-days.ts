// Esta função retorna um array com os nomes dos dias da semana em português,
// começando a partir de segunda-feira.

interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  // Cria um objeto de formatação de data usando a localização 'pt-BR' (português do Brasil)
  // e define o formato para retornar o nome completo do dia da semana.
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  // Cria um array de números de 0 a 6, representando os dias da semana (segunda a domingo).
  // O número 0 representa segunda-feira e o número 6 representa domingo.
  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2023, 7, day))))
    .map((weekDay) => {
      // Transforma a primeira letra de cada nome do dia em maiúscula e mantém o restante do nome.
      if (short) {
        return weekDay.substring(0, 3).toUpperCase()
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}

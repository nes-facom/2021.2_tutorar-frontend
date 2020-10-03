interface Config {
  separator?: string;
  minYear?: number | null;
  maxYear?: number | null;
}

/**
 * @param data - Data no formato dd/mm/yyyy
 * @param config.separator - caractere separador, default '/'
 * @param config.minYear - ano minimo permitido
 * @param config.maxYear - ano maximo permitido
 */
export default (data: string, config?: Config): boolean => {
  if (!data) return false;

  const cfgPadrao = {
    separator: "/",
    minYear: null,
    maxYear: null
  };

  const { minYear, separator, maxYear } = { ...cfgPadrao, ...config };

  const x = data.split(separator);
  const dia = x[0];
  const mes = x[1];
  const ano = x[2];

  if (minYear && Number(ano) < minYear) return false;

  if (maxYear && Number(ano) > maxYear) return false;

  return !Number.isNaN(Date.parse(`${mes}/${dia}/${ano}`));
};

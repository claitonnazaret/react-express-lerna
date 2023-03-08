export const isValidCPF = (cpf: any) => {
  if (typeof cpf !== 'string') return false;
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  cpf = cpf.split('').map((el: any) => +el);
  const rest = (count: number) =>
    ((cpf
      .slice(0, count - 12)
      .reduce((soma: number, el: number, index: number) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;
  return rest(10) === cpf[9] && rest(11) === cpf[10];
};

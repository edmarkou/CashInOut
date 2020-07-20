export const roundNumber = (number, decimals) => {
  let newnumber = parseFloat((number - 0).toFixed(parseInt(decimals)));
  if (number > newnumber) newnumber += 1 / 10 ** parseInt(decimals);
  return newnumber;
}
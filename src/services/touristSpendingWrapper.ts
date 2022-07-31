export function touristSpendingWrapper(data: any) {
  const years: any = [];

  data.forEach((item: any) => {
    const yearAux = item.trimester.slice(0, 4);
    if (!years.includes(yearAux)) {
      years.push(yearAux);
    }
  });

  const container = years.map((item: any) => {
    return {
      year: item,
      data: [],
    };
  });

  data.forEach((item: any) => {
    const yearAux = item.trimester.slice(0, 4);
    const index = container.findIndex((i: any) => i.year === yearAux);
    container[index].data.push(item);
  });

  return container;
}

export const generateColor = index => {
  const colors = [
    '#e57373',
    '#f06292',
    '#ba68c8',
    '#9575cd',
    '#7986cb',
    '#64b5f6',
    '#4fc3f7',
    '#4dd0e1',
    '#4db6ac',
    '#81c784',
    '#aed581',
    '#dce775',
    '#fff176',
    '#ffd54f',
    '#ffb74d',
    '#ff8a65',
    '#a1887f',
    '#e0e0e0',
    '#90a4ae',
  ];
  return colors[index % colors.length];
};

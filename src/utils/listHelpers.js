import lodash from 'lodash';

export function applySortFilter(array, comparator, query, searchBy) {
  if (!Array.isArray(array)) return [];
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    const filterFn = (data) => {
      let found = false;
      searchBy.forEach((s) => {
        if (
          lodash
            .get(data, Array.isArray(s) ? s.split('.') : s)
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1
        ) {
          found = true;
        }
      });
      return found;
    };
    return array.filter(filterFn);
  }
  return stabilizedThis.map((el) => el[0]);
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

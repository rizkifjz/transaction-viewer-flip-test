import {useEffect, useState} from 'react';
import {Transaction} from '../screens/TransactionList';

// we use filter as one object to apply its effect as a whole, in order to minimize render times on useEffect
export type Filter = {
  search: string;
  sort: string;
};

// custom hook to decluter transaction list page
const useFilteredList = (
  sourceList: Transaction[],
  filter: Filter,
): Transaction[] => {
  const [data, setData] = useState<Transaction[]>([]);

  useEffect(() => {
    if (sourceList.length > 0) {
      setData(handleFilterTransactionList(sourceList, filter));
    }
  }, [sourceList, filter]);

  return data;
};

const handleFilterTransactionList = (
  list: Transaction[],
  fl: Filter,
): Transaction[] => {
  let newList: Transaction[];
  if (fl.search === '') {
    newList = list.slice(); // clone old array to new array
  } else if (!isNaN(parseInt(fl.search, 10))) {
    newList = list.filter(
      item => item.amount.toString().search(fl.search.toString()) >= 0,
    );
  } else {
    newList = list.filter(
      item =>
        item.beneficiary_name.toLowerCase().search(fl.search.toLowerCase()) >=
          0 ||
        item.beneficiary_bank.toLowerCase().search(fl.search.toLowerCase()) >=
          0 ||
        item.sender_bank.toLowerCase().search(fl.search.toLowerCase()) >= 0,
    );
  }
  switch (fl.sort) {
    case 'Nama A-Z':
      newList.sort((a, b) =>
        a.beneficiary_name.localeCompare(b.beneficiary_name),
      );
      break;
    case 'Nama Z-A':
      newList.sort((a, b) =>
        b.beneficiary_name.localeCompare(a.beneficiary_name),
      );
      break;
    case 'Tanggal Terbaru':
      newList.sort((a, b) => b.created_at.localeCompare(a.created_at));
      break;
    case 'Tanggal Terlama':
      newList.sort((a, b) => a.created_at.localeCompare(b.created_at));
      break;
    default:
      break;
  }
  return newList;
};
export default useFilteredList;

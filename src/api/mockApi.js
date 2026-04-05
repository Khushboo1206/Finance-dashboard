const STORAGE_KEY = "transactions";

/* GET */
export const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      resolve(data);
    }, 500); // simulate delay
  });
};

/* ADD */
export const createTransaction = (newTx) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existing =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const updated = [newTx, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      resolve(updated);
    }, 300);
  });
};

/* DELETE */
export const removeTransaction = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existing =
        JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const updated = existing.filter((t) => t.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      resolve(updated);
    }, 300);
  });
};
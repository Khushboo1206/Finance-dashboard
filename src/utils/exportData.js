/* CSV EXPORT */
export const exportToCSV = (data) => {
  const headers = ["Date", "Amount", "Category", "Type"];

  const rows = data.map((t) => [
    t.date,
    t.amount,
    t.category,
    t.type,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "transactions.csv";
  link.click();
};

/* JSON EXPORT */
export const exportToJSON = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transactions.json";
  link.click();
};
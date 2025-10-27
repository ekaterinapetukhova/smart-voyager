export interface FormattedDate {
  from: string;
  to: string;
}

export const formatDate = (from: string, to: string): FormattedDate => {
  const formattedFrom = new Date(from).toLocaleString().split(",")[0];
  const formattedTo = new Date(to).toLocaleString().split(",")[0];

  return {
    from: formattedFrom,
    to: formattedTo,
  };
};

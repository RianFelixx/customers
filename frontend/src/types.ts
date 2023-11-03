export type CustomerProps = {
  id: string,
  name: string,
  email: string,
  status: boolean,
  created_at: string,
};

export type ToastError = {
  message: string;
};

export type InputProps = {
  type: string,
  nameLabel: string,
  nameRef: React.LegacyRef<HTMLInputElement> | undefined,
};


export interface SearchFormProps {
    onSearch: (city: string) => void;
    loading?: boolean;
    placeholder?: string;
  }
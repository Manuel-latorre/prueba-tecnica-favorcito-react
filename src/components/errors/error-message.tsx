
import type { ErrorMessageProps } from '@/types/errors.types';

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="px-4 py-4">
      <p className="text-sm text-red-700">{message}</p>
    </div>
  );
} 
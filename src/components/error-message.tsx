
import type { ErrorMessageProps } from '@/types/errors.types';


export function ErrorMessage({ message }: ErrorMessageProps) {
  return (

    <div className="w-fit border border-red-300 bg-red-50 px-4 py-0.5 rounded-full">
      <p className="text-sm text-red-700">{message}</p>
    </div>

  );
} 
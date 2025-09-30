import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
    <div className='text-center py-16'>
      <div className='w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
        <Search className='w-12 h-12 text-gray-400 dark:text-gray-500' />
      </div>
      <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
        No results found
      </h3>
      <p className='text-gray-600 dark:text-gray-400 mb-6'>
        Try adjusting your search terms or filters to find what you&apos;re
        looking for.
      </p>
      <Button onClick={onClearFilters} variant='outline'>
        Clear all filters
      </Button>
    </div>
  );
};

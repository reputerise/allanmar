import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ currentPage, totalPosts, postsPerPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-between border-t border-sf-cream px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-sf-cream hover:border-sf-white hover:text-sf-white"
          >
            <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-sf-cream" />
            Previous
          </button>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              currentPage === number
                ? 'border-sf-lime text-sf-lime'
                : 'border-transparent text-sf-cream hover:text-sf-white hover:border-sf-white'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {currentPage < pageNumbers.length && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-sf-cream hover:border-sf-white hover:text-sf-white"
          >
            Next
            <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-sf-cream" />
          </button>
        )}
      </div>
    </nav>
  );
}
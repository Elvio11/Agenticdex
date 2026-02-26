import { Fragment } from 'react';
import { useJobs } from '../../hooks/useJobs';
import { JobCard } from './JobCard';
import { Sparkles, Loader2 } from 'lucide-react';

export function JobFeed() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useJobs();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse bg-white rounded-xl border border-slate-200 h-64 p-6" />
        ))}
      </div>
    );
  }

  const jobsCount = data?.pages.flat().length || 0;

  if (jobsCount === 0) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your personalised job feed is being prepared.</h2>
        <p className="text-slate-500 max-w-md">Our AI is currently scouring the market and matching jobs to your profile. Check back shortly!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Job Feed</h1>
        <p className="text-slate-500 mt-2">AI-matched opportunities across all platforms for your profile.</p>
      </div>

      <div className="space-y-6">
        {data?.pages.map((group: any[], i: number) => (
          <Fragment key={i}>
            {group.map((jobScore: any) => (
              <JobCard key={jobScore.job_id} jobScore={jobScore} />
            ))}
          </Fragment>
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center justify-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-8 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-primary" />
                Loading more...
              </>
            ) : (
              'Load More Matches'
            )}
          </button>
        </div>
      )}
    </div>
  );
}

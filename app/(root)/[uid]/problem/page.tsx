import { Problem, ProblemStatus } from '@/app/types';
import { lazy, Suspense } from 'react';
const ProblemColumn = lazy(() => import('./ProblemColumn'));

const fetchProblems = async (uid: string): Promise<Problem[]> => {
  const res = await (await fetch(`${process.env.NEXT_PUBLIC_APP_ORIGIN}/api/${uid}/problem`)).json();
  return res.data as Problem[];
};

const page = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params; 
  const problems = await fetchProblems(uid);

  const filteredProblems = {
    [ProblemStatus.JustSolved]: problems.filter((p) => p.status === ProblemStatus.JustSolved),
    [ProblemStatus.StillHard]: problems.filter((p) => p.status === ProblemStatus.StillHard),
    [ProblemStatus.NeedsToReview]: problems.filter((p) => p.status === ProblemStatus.NeedsToReview),
    [ProblemStatus.JustReviewed]: problems.filter((p) => p.status === ProblemStatus.JustReviewed),
    [ProblemStatus.EasyNow]: problems.filter((p) => p.status === ProblemStatus.EasyNow),
  };

  return (
    <section className="flex gap-4 justify-center pt-8 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        {Object.entries(filteredProblems).map(([status, filtered], i) => (
          <ProblemColumn
            key={i}
            type={status as ProblemStatus}
            problems={filtered}
            uid={uid}
          />
        ))}
      </Suspense>
    </section>
  );
};

export default page
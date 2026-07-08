export interface JobPollStep {
  id: string;
  label: string;
  done: boolean;
  active: boolean;
}

export interface UseJobPollOptions<TJob> {
  fetchJob: (jobId: string) => Promise<TJob | null>;
  getStatus: (job: TJob) => string;
  getPhase?: (job: TJob) => string | null | undefined;
  stepsForPhase: (phase: string | null | undefined, status: string) => JobPollStep[];
  intervalMs?: number;
  timeoutMs?: number;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function pollJob<TJob>(
  jobId: string,
  options: UseJobPollOptions<TJob>,
  onUpdate?: (job: TJob, steps: JobPollStep[]) => void,
): Promise<TJob> {
  const intervalMs = options.intervalMs ?? 1500;
  const timeoutMs = options.timeoutMs ?? 15 * 60 * 1000;
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const job = await options.fetchJob(jobId);
    if (!job) {
      throw new Error('Job not found or expired');
    }

    const status = options.getStatus(job);
    const phase = options.getPhase?.(job) ?? null;
    const steps = options.stepsForPhase(phase, status);
    onUpdate?.(job, steps);

    if (status === 'done' || status === 'error') {
      return job;
    }

    await sleep(intervalMs);
  }

  throw new Error('Job polling timed out');
}

export function buildLinearSteps(
  phases: Array<{ id: string; label: string }>,
  currentPhase: string | null | undefined,
  status: string,
): JobPollStep[] {
  const activeIndex = phases.findIndex((p) => p.id === currentPhase);
  const allDone = status === 'done';
  const failed = status === 'error';

  return phases.map((phase, index) => ({
    id: phase.id,
    label: phase.label,
    done: allDone || (activeIndex >= 0 && index < activeIndex),
    active: !allDone && !failed && phase.id === currentPhase,
  }));
}

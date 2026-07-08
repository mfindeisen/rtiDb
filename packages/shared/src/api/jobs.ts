export type AutoAnnotateJobStatus = 'queued' | 'processing' | 'done' | 'error';

export interface AutoAnnotateJob {
  jobId: string;
  status: AutoAnnotateJobStatus;
  phase: string | null;
  position: number;
  created: number;
  methods: string[];
  model: string | null;
  error: string | null;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
}

export type ImageSearchJobStatus = 'queued' | 'processing' | 'done' | 'error';

export interface ImageSearchJob {
  jobId: string;
  status: ImageSearchJobStatus;
  phase: string | null;
  position: number;
  total: number;
  results: unknown[] | null;
  error: string | null;
  cached: boolean;
  contentHash?: string;
  createdAt: number;
  startedAt: number | null;
  finishedAt: number | null;
}

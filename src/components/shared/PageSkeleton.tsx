
import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative h-[400px] w-full bg-gray-200">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="mt-6 h-10 w-64" />
        <Skeleton className="mt-4 h-6 w-96" />
        <Skeleton className="mt-8 h-12 w-48 rounded-full" />
      </div>
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Skeleton className="mx-auto h-8 w-48" />
        <div className="mt-8 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function JobListSkeleton() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Skeleton className="mx-auto h-8 w-48" />
        <Skeleton className="mx-auto mt-2 h-5 w-32" />
        
        
        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <Skeleton className="h-10 w-full" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        
       
        <div className="mt-8 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-lg border bg-white p-6">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-28 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CareersPageSkeleton() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <SectionSkeleton />
      <SectionSkeleton />
      <JobListSkeleton />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[150px] w-full rounded-lg" />
        <Skeleton className="h-[150px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
    </div>
  );
}
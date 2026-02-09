import { DUMMY_APPLICATIONS } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statusColumns = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'] as const;

export default function ApplicationsPage() {
  const applicationsByStatus = statusColumns.reduce((acc, status) => {
    acc[status] = DUMMY_APPLICATIONS.filter((app) => app.status === status);
    return acc;
  }, {} as Record<typeof statusColumns[number], typeof DUMMY_APPLICATIONS>);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track your job applications from start to finish.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {statusColumns.map((status) => (
          <div key={status} className="w-80 shrink-0">
            <h2 className="font-semibold mb-4 px-1">{status} ({applicationsByStatus[status].length})</h2>
            <div className="space-y-4 bg-secondary p-2 rounded-lg h-full">
              {applicationsByStatus[status].map((app) => (
                <Card key={app.id} className="w-full">
                  <CardHeader>
                    <CardTitle className="text-base">{app.job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">{app.job.company.name}</p>
                    <p className="text-xs text-muted-foreground">Applied: {app.appliedDate}</p>
                    <Badge variant="outline" className="mt-2">{app.job.location}</Badge>
                  </CardContent>
                </Card>
              ))}
               {applicationsByStatus[status].length === 0 && (
                <div className="flex h-32 items-center justify-center rounded-lg border-dashed border-2 text-sm text-muted-foreground">
                    No applications
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

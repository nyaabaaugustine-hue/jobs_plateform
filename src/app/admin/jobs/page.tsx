import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminJobsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Job Listings</h1>
        <p className="text-muted-foreground">Manage all job listings.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Job listings management will be here.
        </CardContent>
      </Card>
    </div>
  );
}

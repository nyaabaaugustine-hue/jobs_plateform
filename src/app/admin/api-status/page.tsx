import { Card, CardContent } from '@/components/ui/card';

export default function AdminApiStatusPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">API Status</h1>
        <p className="text-muted-foreground">Monitor the health of external and internal APIs.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          API status dashboard will be here.
        </CardContent>
      </Card>
    </div>
  );
}

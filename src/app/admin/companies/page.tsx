import { Card, CardContent } from '@/components/ui/card';

export default function AdminCompaniesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Company Management</h1>
        <p className="text-muted-foreground">Manage all companies on the platform.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Company management features will be here.
        </CardContent>
      </Card>
    </div>
  );
}

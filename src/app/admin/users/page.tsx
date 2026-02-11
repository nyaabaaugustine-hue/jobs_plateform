import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage all users on the platform.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          User management features will be here.
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';

export default function EmployerSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your employer account and notification preferences.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Account settings will be here.
        </CardContent>
      </Card>
    </div>
  );
}

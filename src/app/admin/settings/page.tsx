import { Card, CardContent } from '@/components/ui/card';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage admin platform settings.</p>
      </div>
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          Settings page content will be here.
        </CardContent>
      </Card>
    </div>
  );
}

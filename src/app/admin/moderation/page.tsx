import { DUMMY_JOBS } from '@/lib/data';
import ModerationCard from '@/app/admin/components/moderation-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ModerationPage() {
    const pendingJobs = DUMMY_JOBS.slice(0,3);
    const flaggedJobs = [DUMMY_JOBS[4]];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Job Moderation</h1>
        <p className="text-muted-foreground">Review and manage job posts to ensure quality and safety.</p>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList>
            <TabsTrigger value="pending">Pending Review ({pendingJobs.length})</TabsTrigger>
            <TabsTrigger value="flagged">AI Flagged ({flaggedJobs.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {pendingJobs.map((job) => (
                    <ModerationCard key={job.id} job={job} />
                ))}
            </div>
        </TabsContent>
         <TabsContent value="flagged" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {flaggedJobs.map((job) => (
                    <ModerationCard key={job.id} job={job} aiFlagged />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="approved">
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    No approved jobs to show.
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="rejected">
            <Card>
                <CardContent className="pt-6 text-center text-muted-foreground">
                    No rejected jobs to show.
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

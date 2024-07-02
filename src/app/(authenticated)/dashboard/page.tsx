import { Heart, Pause, PhoneMissed, Speech } from "lucide-react";
import CallQueue from "./_components/call-queue";
import Statistic from "./_components/statistic";

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <Statistic
          title="Average Wait time"
          subtitle="+3 minutes from yesterday"
          value="3 minutes"
          icon={<Pause className="w-4 h-4 text-muted-foreground" />}
        />
        <Statistic
          title="Abandon Rate"
          subtitle="+3% from yesterday"
          value="3%"
          icon={<PhoneMissed className="w-4 h-4 text-muted-foreground" />}
        />
        <Statistic
          title="Average Handling Time"
          subtitle="+3 minutes from yesterday"
          value="13 minutes"
          icon={<Speech className="w-4 h-4 text-muted-foreground" />}
        />
        <Statistic
          title="Net Promoter Score"
          subtitle="+3 from yesterday"
          value="3"
          icon={<Heart className="w-4 h-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="">
          <CallQueue />
        </div>
      </div>
    </>
  );
}

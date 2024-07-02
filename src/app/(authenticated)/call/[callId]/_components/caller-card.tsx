import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";

const CallerCard = () => {
  return (
    <Card className="bg-card rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-muted-foreground">+1 (555) 555-5555</p>
        </div>
        <div>
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Call
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Account Details</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-muted-foreground">Account Number</p>
            <p>12345678</p>
          </div>
          <div>
            <p className="text-muted-foreground">Balance</p>
            <p>$250.00</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Payment</p>
            <p>05/15/2023</p>
          </div>
          <div>
            <p className="text-muted-foreground">Next Payment Due</p>
            <p>06/15/2023</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CallerCard;
